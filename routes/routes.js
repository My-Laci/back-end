const express = require("express");
const authController = require("../controllers/authController");
const otpController = require("../controllers/otpController");
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
router.post("/signin", authController.signIn);

//OTP's routes
router.post("/otp", otpController.otp);
module.exports = router;

// Article routes
router.get(
  "/articles",
  authMiddleware.verifyToken,
  articleController.getAllArticles
);
router.get(
  "/articles/:id",
  authMiddleware.verifyToken,
  articleController.getArticleById
);
router.get(
  "/articles/user/:userId",
  authMiddleware.verifyToken,
  articleController.getArticlesByUser
);
router.post(
  "/articles",
  authMiddleware.verifyToken,
  upload.single("image"),
  articleController.createArticle
);
router.put(
  "/articles/:id",
  authMiddleware.verifyToken,
  upload.single("image"),
  articleController.updateArticle
);
