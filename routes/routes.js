const express = require("express");
const authController = require('../controllers/authController');
const otpController = require('../controllers/otpController');
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
router.post("/signin", authController.signIn);

//OTP's routes
router.post("/otp", otpController.otp);
module.exports = router;