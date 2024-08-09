const bcrypt = require("bcrypt")
const userService = require("../services/userService");

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw Error("An email is required.");
        const createdPasswordResetOTP = await userService.sendPasswordResetOTP(email);
        res.status(200).json(createdPasswordResetOTP);
    } catch (error) {
        res.statu(400).send(error.message);
    }
};