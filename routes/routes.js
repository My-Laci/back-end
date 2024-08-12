const express = require("express");
const authController = require("../controllers/authController");
const otpController = require("../controllers/otpController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const articleController = require("../controllers/articleController");
const voucherController = require("../controllers/voucherController");
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
router.post("/signout", authController.signout);
router.get("/users", userController.getAllUsers);

// User's routes
router.post("/updateFullName", userController.updateFullName);
router.post("/requestResetPassword", userController.forgotPassword);
router.post("/resetPassword", userController.resetPassword);
router.post("/updatePassword", userController.updatePassword);

// OTP's routes
router.post("/sendOTP", otpController.sendOTP);
router.post("/verifyOTP", otpController.verifyOTP);

// Article's routes
router.post(
  "/articles",
  authMiddleware.verifyToken,
  upload.upload, // No need to change this; it now handles multiple images
  articleController.createArticle
);
router.get("/articles", articleController.getAllArticles);
router.get("/articles/:id", articleController.getArticleById);
router.get("/articles/user/:userId", articleController.getArticlesByUser);
router.put(
  "/articles/:id",
  authMiddleware.verifyToken,
  upload.upload, // Same here for updating articles
  articleController.updateArticle
);
router.delete(
  "/articles/:id",
  authMiddleware.verifyToken,
  articleController.deleteArticle
);

// Voucher's routes
router.post("/vouchers/create", voucherController.createVoucherBatch); // Admin route
router.get("/vouchers", voucherController.getAllVouchers); // Admin route
router.post("/vouchers/validate", voucherController.validateVoucher);
router.get("/vouchers/user/:userId", voucherController.getVouchersByUser);
router.delete(
  "/vouchers/batch/:batchName",
  voucherController.deleteVoucherBatch
);

module.exports = router;
