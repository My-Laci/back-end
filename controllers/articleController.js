const articleService = require('../services/articleService');

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get articles by user
exports.getArticlesByUser = async (req, res) => {
  try {
    const articles = await articleService.getArticlesByUser(req.params.userId);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new article
exports.createArticle = async (req, res) => {
  const { title, content, author } = req.body;
  const articleData = {
    title,
    content,
    author: req.currentUser.payload.id,
    image: req.file ? req.file.path : '',
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
    image: req.file ? req.file.path : '',
  };

  try {
    const updatedArticle = await articleService.updateArticle(req.params.id, articleData);
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
