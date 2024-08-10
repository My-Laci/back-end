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

exports.updatePassword = async ({ email, oldPassword, newPassword }) => {
    try {
        // Cari pengguna berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            throw Error("User not found");
        }

        // Verifikasi password lama
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw Error("Old password is incorrect");
        }

        // Validasi password baru
        if (newPassword.length < 8) {
            throw Error("New password is too short!");
        }

        // Hash password baru
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password di database
        await User.updateOne({ email }, { password: hashedNewPassword });

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

exports.getAllUsers = async () => {
    try {
        return await User.find({});
    } catch (error) {
        throw error;
    }
};

exports.getUserById = async (_id) => {
    try {
        const user = await User.findById(_id);
        if (!user) {
            throw Error("User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
};