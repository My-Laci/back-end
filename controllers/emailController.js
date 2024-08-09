const emailVerifService = require("../services/emailService");

exports.sendVerificationOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw Error("An email is required");

        const createdEmailVerificationOTP = await emailVerifService.sendVerificationOTPEmail(email);
        res.status(200).json(createdEmailVerificationOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.sendVerificationOTPSignUp = async (email) => {
    try {
        if (!email) throw Error("An email is required");

        const createdEmailVerificationOTP = await emailVerifService.sendVerificationOTPSignUp(email);
        return createdEmailVerificationOTP;
    } catch (error) {
        throw error; // Propagate the error so it can be caught and handled in authController.js
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        let { email, otp } = req.body;
        if (!(email && otp)) throw Error("Empty OTP details are not allowed");

        await emailVerifService.verifyOTPEmail({ email, otp });
        res.status(200).json({ email, verified: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

