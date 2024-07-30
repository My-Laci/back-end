const express = require("express");
const authController = require('../controllers/authController');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Laci API Server.",
    });
});

// Auth's routes
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;