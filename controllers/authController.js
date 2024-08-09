const authService = require('../services/authService');
const emailVerifController = require('./emailController');
const emailVerifService = require("../services/emailService");
const TempUser = require('../models/tempUser');
const User = require('../models/user');

exports.signUp = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();

        if (!(name && email && password)) {
            throw Error("Empty input fields!");
        } else if (!/^[a-zA-Z ]*$/.test(name)) {
            throw Error("Invalid name entered");
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw Error("Invalid email entered");
        } else if (password.length < 8) {
            throw Error("Password is too short!");
        }

        await authService.signUp({ name, email, password });
        await emailVerifController.sendVerificationOTPSignUp(email);

        res.status(200).json({
            status: true,
            message: "OTP sent to your email. Please enter the OTP to complete the sign-up process.",
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(400).json({ error: error.message });
        }
    }

};

exports.signIn = async (req, res) => {
    try {

        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (!(email && password)) {
            throw Error("Empty credentials supplied");
        }

        const authenticatedUser = await authService.signIn(req.body);
        res.status(200).json(authenticatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.verifySignUpOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        await emailVerifService.verifyOTPSignUp({ email, otp });

        // Retrieve the temporarily stored user data from MongoDB
        const tempUser = await TempUser.findOne({ email });
        if (!tempUser) {
            throw Error("Temporary user not found. Please sign up again.");
        }

        // Create the permanent user in the `users` collection
        const newUser = new User({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password,
        });
        await newUser.save();

        // Delete the temporary user from `temp_users` collection
        await TempUser.deleteOne({ email });

        res.status(201).json({
            status: true,
            message: "User Created!",
            data: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};