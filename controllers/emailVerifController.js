const emailVerifService = require("../services/emailVerifService");

exports.sendVerificationOTPEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw Error("An email is required");

        const createdEmailVerificationOTP = await emailVerifService.sendVerificationOTPEmail(email);
        res.status(200).json(createdEmailVerificationOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
};