const express = require("express");
const authController = require('../controllers/authController');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Laci API Server.",
    });
});

// Auth's routes
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;