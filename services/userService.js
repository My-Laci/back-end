const User = require("../models/User");
const { sendOTP, verifyOTP, deleteOTP } = require("./otpService");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');


let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('userProfileImages');
});

exports.getAllUsers = async () => {
    try {
        return await User.find({});
    } catch (error) {
        throw error;
    }
};

exports.getUserById = async (_id) => {
    try {
        const user = await User.findOne({ _id });
        if (!user) {
            throw Error("User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
};

exports.updateFullName = async (id, newFullName) => {
    try {
        const _id = id;
        const existingUser = await User.findOne({ _id });
        if (!existingUser) {
            throw Error("Account not existed");
        }

        await User.updateOne({ _id }, { name: newFullName });
        return;
    } catch (error) {
        throw error;
    }
};

exports.updateEmail = async (id, newEmail) => {
    try {
        const _id = id;
        const user = await User.findOne({ _id });
        const emailUsed = await User.findOne({ email: newEmail });
        if (emailUsed) {
            throw Error("The email has been used by another account");
        }

        user.email = newEmail;
        await user.save();
        return;
    } catch (error) {
        throw error;
    }
};

exports.updatePassword = async ({ id, oldPassword, newPassword }) => {
    try {
        const _id = id;
        const user = await User.findOne({ _id });
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
        await User.updateOne({ _id }, { password: hashedNewPassword });

        return;
    } catch (error) {
        throw error;
    }
};

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

exports.updateProfileImage = async (id, filename) => {
    try {
        const _id = id;
        const existingUser = await User.findOne({ _id });
        if (!existingUser) {
            throw Error("Account not existed");
        }
        console.log(filename);

        await User.updateOne({ _id }, { profileImg: filename });
        return;
    } catch (error) {
        throw error;
    }
};