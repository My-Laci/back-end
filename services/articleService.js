const Article = require('../models/Article');

// Get all articles
const getAllArticles = async () => {
  return await Article.find().populate('author', 'name');
};

// Get article by ID
const getArticleById = async (id) => {
  return await Article.findById(id).populate('author', 'name');
};

// Get articles by user
const getArticlesByUser = async (userId) => {
  return await Article.find({ author: userId }).populate('author', 'name');
};

// Create new article
const createArticle = async (articleData) => {
  const article = new Article(articleData);
  return await article.save();
};

// Update article by ID
const updateArticle = async (id, articleData) => {
  const article = await Article.findById(id);
  if (!article) {
    throw new Error('Article not found');
  }

  article.title = articleData.title || article.title;
  article.content = articleData.content || article.content;
  article.image = articleData.image || article.image;

  return await article.save();
};

module.exports = {
  getAllArticles,
  getArticleById,
  getArticlesByUser,
  createArticle,
  updateArticle,
};
