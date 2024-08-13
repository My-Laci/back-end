const articleService = require("../services/articleService");

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get articles by user
exports.getArticlesByUser = async (req, res) => {
  try {
    const articles = await articleService.getArticlesByUser(req.params.userId);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new article
exports.createArticle = async (req, res) => {
  console.log("inside article");
  const { title, content } = req.body;

  const articleData = {
    title,
    content,
    author: req.currentUser.payload.id,
    imageFilename: req.file ? req.file.filename : "",
  };

  try {
    const newArticle = await articleService.createArticle(articleData);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update article by ID
exports.updateArticle = async (req, res) => {
  const articleData = {
    title: req.body.title,
    content: req.body.content,
    imageFilename: req.file ? req.file.filename : "",
  };

  try {
    const updatedArticle = await articleService.updateArticle(
      req.params.id,
      articleData
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  const articleId = req.params.id;

  try {
    const deleteArticle = articleService.deleteArticle(
      articleId,
    )
    res.status(200).json({message: "Article succesfully deleted"})
  } catch (error) {
    res.status(404).json({message: "Article not found"})
  }
};
