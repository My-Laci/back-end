const authService = require('../services/authService');

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
        } else {
            const newUser = await authService.signUp({
                name,
                email,
                password,
            });
            res.status(201).json({
                status: true,
                message: "User Created!",
                data: newUser,
            }
            );
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
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