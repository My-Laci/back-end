const Article = require("../models/Article");
const Post = require("../models/post");
const User = require("../models/User");

exports.search = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    const posts = await Post.find({
      $or: [
        { caption: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
      ],
    });

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json({
      articles,
      posts,
      users,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error during search", error });
  }
};
