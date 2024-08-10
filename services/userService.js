const User = require("../models/user");
const { sendOTP, verifyOTP, deleteOTP } = require("./otpService");
const bcrypt = require("bcrypt")


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
};

exports.resetPassword = async ({ email, otp, newPassword }) => {
    try {
        const validOTP = await verifyOTP({ email, otp });
        if (!validOTP) {
            throw Error("Invalid code.")
        }

        if (newPassword.length < 8) {
            throw Error("Password is too short!");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ email }, { password: hashedNewPassword });
        await deleteOTP(email);

        return;
    } catch (error) {
        throw error;

    }
};

exports.updateFullName = async (email, newFullName) => {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw Error("There is no account existed with the provided email");
        }

        await User.updateOne({ email }, { name: newFullName });
        return;
    } catch (error) {
        throw error;
    }
};