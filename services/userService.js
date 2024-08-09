const User = require("../models/user");
const { sendOTP, verifyOTP, deleteOTP } = require("./otpService");

exports.sendPasswordResetOTP = async (email) => {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw Error("There is no account existed with the provided email");
        }

        const otpDetails = {
            email,
            subject: "Password Reset",
            message: "Enter the code below to reset your password.",
            duration: 5,
        }

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }

}