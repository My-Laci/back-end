const authService = require('../services/authService');
const emailVerifService = require("../services/emailService");
const Voucher = require("../models/Voucher");
const User = require('../models/User');

exports.signUp = async (req, res) => {
    try {
        let { name, email, password, agencyOrigin, code } = req.body;
        name = name.trim();
        email = email.trim();
        agencyOrigin = agencyOrigin.trim();
        password = password.trim();

        if (!(name && email && agencyOrigin && password && code)) {
            throw Error("Empty input fields!");
        } else if (!/^[a-zA-Z ]*$/.test(name)) {
            throw Error("Invalid name entered");
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw Error("Invalid email entered");
        } else if (password.length < 8) {
            throw Error("Password is too short!");
        }

        const voucherCode = await Voucher.findOne({ code, isActive: true });
        if (!voucherCode) {
            res.status(400).json({ message: "Invalid or inactive voucher" });
        }

        await authService.signUp({ name, email, agencyOrigin, password });
        await emailVerifService.sendVerificationOTP(email);

        voucherCode.isActive = false;
        await voucherCode.save();

        res.status(200).json({
            status: true,
            message: "Please Check your email for verification.",
        });
    } catch (error) {
        if (!res.headersSent) {
            return res.status(400).json({ message: error.message });
        }
    }

};

exports.signIn = async (req, res) => {
    try {

        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (!(email && password)) {
            throw Error("Empty credentials supplied");
        }

        const authenticatedUser = await authService.signIn(req.body);
        res.status(200).json(authenticatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.signout = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"] || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);;
        if (!token) throw Error("Token missing or invalid");

        const user = await User.findOne({ token });
        if (!user) throw Error("User not found or already logged out");
        user.token = null;
        await user.save();

        res.status(200).json({ status: true, message: "Successfully logged out" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
