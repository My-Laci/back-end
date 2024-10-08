const Multer = require("multer");
const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const emailController = require("../controllers/emailController");
const authMiddleware = require("../middlewares/authMiddleware");
const articleController = require("../controllers/articleController");
const voucherController = require("../controllers/voucherController");
const postController = require("../controllers/postController");
const searchController = require("../controllers/searchController");
const internshipController = require("../controllers/internshipController");
const router = express.Router();

const storage = Multer.memoryStorage();
const upload = Multer({ storage });

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Laci API Server.",
  });
});

const storageImage = require("../middlewares/storage");

const multer = Multer({
  storage: Multer.memoryStorage,
  fileSize: 10 * 1024 * 1024,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// Auth's routes
router.post("/signup", authController.signUp);
router.post("/signin", upload.single("none"), authController.signIn);
router.post("/signout", authController.signout);
router.get("/users", authMiddleware.verifyToken, userController.getAllUsers);
router.get("/users/:id", userController.getUserById);

// User's routes
router.patch(
  "/users/:id/updateFullName",
  authMiddleware.verifyToken,
  userController.updateFullName
);
router.patch(
  "/users/:id/updateEmail",
  authMiddleware.verifyToken,
  userController.updateEmail
);
router.patch(
  "/users/:id/updatePassword",
  authMiddleware.verifyToken,
  userController.updatePassword
);
router.post(
  "/users/:id/sendEmailVerification",
  authMiddleware.verifyToken,
  emailController.sendVerificationOTP
);
router.post("/users/:id/verifyEmail", emailController.verifyOTP);
router.post("/users/requestResetPassword", userController.forgotPassword);
router.post("/users/resetPassword", userController.resetPassword);
router.post(
  "/users/:id/profile-image",
  authMiddleware.verifyToken,
  multer.single("IMAGE"),
  storageImage.uploadProfileImgToCloudStorage,
  userController.updateProfileImage
);

// Article's routes
router.post(
  "/articles",
  upload.single("image"),
  authMiddleware.verifyToken,
  articleController.createArticle
);
router.get("/articles", articleController.getAllArticles);
router.get("/articles/:id", articleController.getArticleById);
router.get("/articles/user/:userId", articleController.getArticlesByUser);
router.put(
  "/articles/:id",
  upload.single("none"),
  authMiddleware.verifyToken,
  articleController.updateArticle
);
router.delete(
  "/articles/:id",
  authMiddleware.verifyToken,
  articleController.deleteArticle
);
router.post(
  "/articles/:id/like",
  authMiddleware.verifyToken,
  articleController.likeArticle
);
router.post(
  "/articles/:id/unlike",
  authMiddleware.verifyToken,
  articleController.unlikeArticle
);

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
router.get("/post/:id", postController.getUserPost);
router.get("/posts", postController.getAllPost);
router.get("/post/detail/:id", postController.getPostDetail);
router.delete(
  "/posts/:id",
  authMiddleware.verifyToken,
  postController.deletePost
);
router.post("/posts/:id/like", authMiddleware.verifyToken, postController.likePost);
router.post("/posts/:id/unlike", authMiddleware.verifyToken, postController.unlikePost);

// Voucher's routes
router.post(
  "/vouchers/create",
  upload.single("none"),
  voucherController.createVoucherBatch
);

// Admin route
router.get("/vouchers", voucherController.getAllVouchers); // Admin route
router.get("/vouchers/batch/:batchName", voucherController.getVouchersByBatch);
router.get("/vouchers/user/:userId", voucherController.getVouchersByUser);
router.delete(
  "/vouchers/batch/:batchName",
  voucherController.deleteVoucherBatch
);

// Search routes
router.get("/search", searchController.search);

// Internship route
router.post(
  "/internship",
  upload.single("none"),
  authMiddleware.verifyToken,
  internshipController.createIntership
);
router.get(
  "/internship",
  authMiddleware.verifyToken,
  internshipController.getAllInternship
);
router.get(
  "/internship/user/:id",
  authMiddleware.verifyToken,
  internshipController.getUserInternship
);
router.get(
  "/internship/:id",
  authMiddleware.verifyToken,
  internshipController.getInternshipDetail
);
router.put(
  "/internship/:id",
  upload.single("none"),
  authMiddleware.verifyToken,
  internshipController.updateInternship
);
router.delete(
  "/internship/:id",
  authMiddleware.verifyToken,
  internshipController.deleteInternship
);

module.exports = router;
