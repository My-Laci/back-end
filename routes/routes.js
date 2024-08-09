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
router.post("/verifySignup", authController.verifySignUpOTP);
router.post("/signin", authController.signIn);

//OTP's routes
router.post("/sendOTP", otpController.sendOTP);
router.post("/verifyOTP", otpController.verifyOTP);

//Email Verification's routes
// router.post("/sendEmailVerification", emailVerifController.sendVerificationOTP);
// router.post("/verifyEmail", emailVerifController.verifyOTP);

// Create an article
router.post(
  "/create",
  authMiddleware.verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const articleData = {
        title: req.body.title,
        content: req.body.content,
        author: req.currentUser.payload.id,
      };

      if (req.file) {
        articleData.imageFilename = req.file.filename;
      }

      const newArticle = new Article(articleData);
      await newArticle.save();
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name email");
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get article by ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
