const emailVerifService = require("../services/emailService");

exports.sendVerificationOTP = async (req, res) => {
    try {
        const { id } = req.params;
        const createdEmailVerificationOTP = await emailVerifService.sendVerificationOTP(id);
        res.status(200).json(createdEmailVerificationOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { id } = req.params;
        let { otp } = req.body;
        if (!(otp)) throw Error("Empty OTP details are not allowed");

        await emailVerifService.verifyOTP({ id, otp });
        res.status(200).json({ id, verified: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
};