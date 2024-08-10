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

exports.updatePassword = async (req, res) => {
    try {
        let { email, otp, newPassword } = req.body;
        if (!(email && otp && newPassword)) throw Error("Please provide the credentials needed.");

        await userService.resetPassword({ email, otp, newPassword });
        res.status(200).json({ email, passwordreset: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
}