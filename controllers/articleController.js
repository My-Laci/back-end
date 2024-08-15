const Article = require("../models/Article");

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    console.log('Files uploaded:', req.files);
    const { title, content } = req.body;
    const author = req.currentUser.payload.id;

    // Handle image files
    const images = req.files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));

    const article = new Article({
      title,
      content,
      author,
      images,
    });

    await article.save();

    // Modify response to include concise image information
    res.status(201).json({
      article: {
        _id: article._id,
        title: article.title,
        content: article.content,
        author: article.author,
        images: article.images.map((image) => ({
          contentType: image.contentType,
        })), // only include content type of images
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name email");

    const modifiedArticles = articles.map((article) => ({
      _id: article._id,
      title: article.title,
      content: article.content,
      author: article.author,
      images: article.images.map((image) => ({
        contentType: image.contentType,
      })),
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
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const modifiedArticle = {
      _id: article._id,
      title: article.title,
      content: article.content,
      author: article.author,
      images: article.images.map((image) => ({
        contentType: image.contentType,
      })),
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };

    res.status(200).json(modifiedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get articles by user
// exports.getArticlesByUser = async (req, res) => {
//   try {
//     console.log("Request User ID:", req.params.userId);
//     const articles = await Article.find({ author: req.params.userId }).populate(
//       "author",
//       "name email"
//     );

//     console.log("Found Articles:", articles);

//     const modifiedArticles = articles.map((article) => ({
//       _id: article._id,
//       title: article.title,
//       content: article.content,
//       author: article.author,
//       images: article.images.map((image) => ({
//         contentType: image.contentType,
//       })),
//       createdAt: article.createdAt,
//       updatedAt: article.updatedAt,
//     }));

//     res.status(200).json(modifiedArticles);
//   } catch (error) {
//     console.error("Error fetching articles:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getArticlesByUser = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.params.userId }).populate(
      "author",
      "name email"
    );

    if (!articles || articles.length === 0) {
      return res
        .status(404)
        .json({ message: "No articles found for this user" });
    }

    const modifiedArticles = articles.map((article) => {
      // Ensure images array is defined
      const images = article.images || [];

      return {
        _id: article._id,
        title: article.title,
        content: article.content,
        author: article.author,
        images: images.map((image) => ({
          contentType: image.contentType,
        })),
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      };
    });

    res.status(200).json(modifiedArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Find the article without updating the images
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const modifiedArticle = {
      _id: article._id,
      title: article.title,
      content: article.content,
      author: article.author,
      images: article.images.map((image) => ({
        contentType: image.contentType,
      })),
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };

    res.status(200).json(modifiedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  const articleId = req.params.id;

  try {
    const deleteArticle = articleService.deleteArticle(articleId);
    res.status(200).json({ message: "Article succesfully deleted" });
  } catch (error) {
    res.status(404).json({ message: "Article not found" });
  }
};
