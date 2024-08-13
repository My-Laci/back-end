const Article = require("../models/Article");

// Get all articles
const getAllArticles = async () => {
  return await Article.find().populate("author", "name email");
};

// Get article by ID
const getArticleById = async (id) => {
  return await Article.findById(id).populate("author", "name email");
};

// Get articles by user
const getArticlesByUser = async (_id) => {
  return await Article.find({ author: _id }).populate("author", "name email");
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
    throw new Error("Article not found");
  }

  article.title = articleData.title || article.title;
  article.content = articleData.content || article.content;

  return await article.save();
};

const deleteArticle = async (id) => {
  const deleteArticle = Article.findByIdAndDelete(id);
  if (!deleteArticle) {
    throw new Error ("Article not found")
  }

  return
};

module.exports = {
  getAllArticles,
  getArticleById,
  getArticlesByUser,
  createArticle,
  updateArticle,
  deleteArticle,
};
