const express = require("express");
const authController = require('../controllers/authController');
const otpController = require('../controllers/otpController');
const emailController = require('../controllers/emailController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Laci API Server.",
    });
});

// Auth's routes
router.get("/private-test", authMiddleware.verifyToken, (req, res) => {
    res.status(200).send(`You're in the private territory of ${req.currentUser.payload.email}`);
})
router.post("/signup", authController.signUp);
router.post("/verifySignup", authController.verifySignUpOTP);
router.post("/signin", authController.signIn);

//OTP's routes
router.post("/sendOTP", otpController.sendOTP);
router.post("/verifyOTP", otpController.verifyOTP);

//Email Verification's routes
// router.post("/sendEmailVerification", emailVerifController.sendVerificationOTP);
// router.post("/verifyEmail", emailVerifController.verifyOTP);

module.exports = router;