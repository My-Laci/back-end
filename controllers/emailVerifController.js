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

exports.verifyOTPEmail = async (req, res) => {
    try {
        let { email, otp } = req.body;
        if (!(email && otp)) throw Error("Empty OTP details are not allowed");

        await emailVerifService.verifyOTPEmail({ email, otp });
        res.status(200).json({ email, verified: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
};