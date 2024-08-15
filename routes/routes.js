const multer = require("multer");
const express = require("express");
const authController = require("../controllers/authController");
const otpController = require("../controllers/otpController");
const userController = require("../controllers/userController");
const emailController = require("../controllers/emailController");
const authMiddleware = require("../middlewares/authMiddleware");
const articleController = require("../controllers/articleController");
const voucherController = require("../controllers/voucherController");
const postController = require("../controllers/postController");
const router = express.Router();

// Nambahj
// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Laci API Server.",
  });
});

// Auth's routes
// router.get("/private-test", authMiddleware.verifyToken, (req, res) => {
//   res
//     .status(200)
//     .send(
//       You're in the private territory of ${req.currentUser.payload.email}
//     );
// });
router.post("/signup", authController.signUp);
router.post("/verifySignup", authController.verifySignUpOTP);
router.post("/signin", authController.signIn);
router.post("/signout", authController.signout);
router.get("/users", userController.getAllUsers);

// User's routes
router.post("/updateFullName", userController.updateFullName);
router.post("/updateEmail", userController.updateEmail);
router.post("/requestResetPassword", userController.forgotPassword);
router.post("/resetPassword", userController.resetPassword);
router.post("/updatePassword", userController.updatePassword);
router.post("/sendEmailVerification", emailController.sendVerificationOTP);
router.post("/verifyEmail", emailController.verifyOTP);

// OTP's routes
router.post("/sendOTP", otpController.sendOTP);
router.post("/verifyOTP", otpController.verifyOTP);

// Article's routes
router.post(
  "/articles",
  upload.single("articleImage"),
  authMiddleware.verifyToken,
  articleController.createArticle
);
router.get("/articles", articleController.getAllArticles);
router.get("/articles/:id", articleController.getArticleById);
router.get("/articles/user/:userId", articleController.getArticlesByUser);
router.put(
  "/articles/:id",
  authMiddleware.verifyToken,
  articleController.updateArticle
);
router.delete("/articles/:id", articleController.deleteArticle);

// Post's routers
router.post(
  "/post",
  upload.array("imageContent"),
  authMiddleware.verifyToken,
  postController.createPost
);
router.put(
  "/post/:id",
  upload.array("imageContent"),
  authMiddleware.verifyToken,
  postController.updatePost
);
router.get("/post/:id", authMiddleware.verifyToken, postController.getUserPost);
router.get("/post/all", authMiddleware.verifyToken, postController.getAllPost);
router.get(
  "/post/detail/:id",
  authMiddleware.verifyToken,
  postController.getPostDetail
);

// Voucher's routes
router.post(
  "/vouchers/create",
  upload.single("none"),
  voucherController.createVoucherBatch
); // Admin route
router.get("/vouchers", voucherController.getAllVouchers); // Admin route
router.post("/vouchers/validate", voucherController.validateVoucher);
router.get("/vouchers/user/:userId", voucherController.getVouchersByUser);
router.delete(
  "/vouchers/batch/:batchName",
  voucherController.deleteVoucherBatch
);

module.exports = router;
