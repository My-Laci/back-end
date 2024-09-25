const Article = require("../models/Article");
const User = require("../models/User");

// Create an Article
const createArticle = async (articleData) => {
  const saveArticleimage = new Article(articleData);
  return await saveArticleimage.save();
};

// Get all articles
const getAllArticles = async () => {
  // Mengambil semua artikel dan populate data pengguna
  return await Article.find()
    .populate("author", "name email agencyOrigin profileImg") // Mengambil informasi pengguna
    .sort({ createdAt: -1 }); // Mengurutkan berdasarkan tanggal terbaru
};

// Get article by ID
const getArticleById = async (id) => {
  return await Article.findById(id).populate(
    "author",
    "name email agencyOrigin profileImg"
  );
};

// Get articles by user
const getArticlesByUser = async (_id) => {
  return await Article.find({ author: _id }).populate(
    "author",
    "name email agencyOrigin profileImg"
  );
};

// Update article by ID
const updateArticle = async (id, articleData) => {
  // Mencari artikel berdasarkan ID
  const article = await Article.findById(id);
  if (!article) {
    throw new Error("Article not found");
  }

  // Memperbarui artikel jika title atau content diberikan dalam request
  article.title = articleData.title || article.title;
  article.content = articleData.content || article.content;

  // Menyimpan perubahan ke database dan mengembalikan artikel yang sudah diperbarui
  const updatedArticle = await article.save();
  return updatedArticle;
};

// Delete article by ID
const deleteArticle = async (id) => {
  const deleteArticle = await Article.findByIdAndDelete(id);
  if (!deleteArticle) {
    throw new Error("Article not found");
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  getArticlesByUser,
  createArticle,
  updateArticle,
  deleteArticle,
};
