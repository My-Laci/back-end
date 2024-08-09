const Otp = require("../models/otp");
const otpService = require('../services/otpService')

exports.sendOTP = async (req, res) => {
    try {
        const { email, subject, message, duration } = req.body;

        const createdOTP = await otpService.sendOTP({
            email,
            subject,
            message,
            duration,
        });
        res.status(200).json(createdOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        let { email, otp } = req.body;
        const validOTP = await otpService.verifyOTP({ email, otp })
        res.status(200).json({ valid: validOTP });
    } catch (error) {
        res.status(400).send(error.message);
    }
}