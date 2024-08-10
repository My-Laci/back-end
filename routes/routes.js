const express = require("express");
const authController = require("../controllers/authController");
const otpController = require("../controllers/otpController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const articleController = require("../controllers/articleController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Laci API Server.",
  });
});

// Auth's routes
router.get("/private-test", authMiddleware.verifyToken, (req, res) => {
  res
    .status(200)
    .send(
      `You're in the private territory of ${req.currentUser.payload.email}`
    );
});
router.post("/signup", authController.signUp);
router.post("/verifySignup", authController.verifySignUpOTP);
router.post("/signin", authController.signIn);

// User's routes
router.post("/requestResetPassword", userController.forgotPassword);
router.post("/resetPassword", userController.updatePassword);

// OTP's routes
router.post("/sendOTP", otpController.sendOTP);
router.post("/verifyOTP", otpController.verifyOTP);

router.post(
  "/articles",
  authMiddleware.verifyToken,
  upload.upload,
  articleController.createArticle
);
router.get("/articles", articleController.getAllArticles);
router.get("/articles/:id", articleController.getArticleById);
router.get("/articles/user/:userId", articleController.getArticlesByUser);
router.put(
  "/articles/:id",
  authMiddleware.verifyToken,
  upload.upload,
  articleController.updateArticle
);

module.exports = router;
