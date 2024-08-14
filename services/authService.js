const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken");

const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

function createToken(user) {
    const payload = { id: user._id, email: user.email, name: user.name }
    return jwt.sign({ payload }, TOKEN_KEY, { expiresIn: TOKEN_EXPIRY });
};

exports.signUp = async (data) => {
    try {
        const { name, email, password } = data;

        // Check existing users
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw Error("Email sudah terpakai");
        }
        //Hash Password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new temporary user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profileImg: "https://storage.googleapis.com/laci-development/usersProfileImage/defaultprofile.jpg"
        });
        await newUser.save();

        // Return the new user without the password
        return { id: newUser._id, name: newUser.name, email: newUser.email }
    } catch (error) {
        throw error;
    }

};

exports.signIn = async (data) => {
    try {

        const { email, password } = data;
        const fetchedUser = await User.findOne({ email });

        //check if user exists
        if (!fetchedUser) {
            throw Error("User Not Found!");
        }


        if (await bcrypt.compare(password, fetchedUser.password)) {

            //create user token
            const generatedToken = createToken(fetchedUser);
            fetchedUser.token = generatedToken;
            await fetchedUser.save();

            // Return user data without the password
            const { password, ...userWithoutPassword } = fetchedUser._doc;
            return userWithoutPassword;

        } else {
            throw Error("Invalid Password!");
        }

    } catch (error) {
        throw error;
    }
}