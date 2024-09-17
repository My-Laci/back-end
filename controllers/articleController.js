const articleService = require("../services/articleService");
const userService = require("../services/userService");
const mediaService = require("../services/mediaService");

// Create a new article
exports.createArticle = async (req, res) => {
  const { title, content } = req.body;
  const articleImage = req.file;
  const author = req.currentUser.payload.id;
  const authorData = await userService.getUserById(author);
  const authorName = authorData.name;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!articleImage) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const uploadResult = await mediaService.articleMedia(
      articleImage.buffer,
      articleImage.originalname
    );

    const imageUrl = uploadResult.url;

    const articleData = {
      authorName,
      title,
      content,
      author,
      image: imageUrl,
    };

    const savedArticle = await articleService.createArticle(articleData);
    return res.status(200).json({
      message: "Article successfully created",
      savedArticle,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();

    const modifiedArticles = articles.map((article) => ({
      _id: article._id,
      title: article.title,
      content: article.content,
      author: {
        _id: article.author._id,
        name: article.author.name,
        email: article.author.email,
        agencyOrigin: article.author.agencyOrigin,
        profileImg: article.author.profileImg,
      },
      image: article.image
        ? {
          url: article.image,
        }
        : null,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }));

    res.status(200).json(modifiedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await articleService.getArticleById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const modifiedArticle = {
      _id: article._id,
      title: article.title,
      content: article.content,
      author: {
        _id: article.author._id,
        name: article.author.name,
        email: article.author.email,
        agencyOrigin: article.author.agencyOrigin,
        profileImg: article.author.profileImg,
      },
      image: article.image
        ? {
          url: article.image,
        }
        : null,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };

    res.status(200).json(modifiedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get articles by user
exports.getArticlesByUser = async (req, res) => {
  try {
    const articles = await articleService.getArticlesByUser(req.params.userId);

    const modifiedArticles = articles.map((article) => ({
      _id: article._id,
      title: article.title,
      content: article.content,
      author: {
        _id: article.author._id,
        name: article.author.name,
        email: article.author.email,
        agencyOrigin: article.author.agencyOrigin,
        profileImg: article.author.profileImg,
      },
      image: article.image ? { url: article.image } : null,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }));

    res.status(200).json(modifiedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedArticle = await articleService.updateArticle(id, {
      title,
      content,
    });

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    const modifiedArticle = {
      _id: updatedArticle._id,
      title: updatedArticle.title,
      content: updatedArticle.content,
      author: updatedArticle.author,
      image: updatedArticle.image ? { url: updatedArticle.image } : null,
      createdAt: updatedArticle.createdAt,
      updatedAt: updatedArticle.updatedAt,
    };

    res.status(200).json(modifiedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await articleService.getArticleById(id);
    const imageUrls = article.image;

    const deleteImage = await mediaService.deleteImage(imageUrls);

    const deleteArticle = await articleService.deleteArticle(id);

    return res.status(200).json({
      message: "Article and associated images successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting post or images:", error);

    return res.status(500).json({
      message: "Failed to delete post and images",
      error: error.message,
    });
  }
};
