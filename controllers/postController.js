const { nanoid } = require("nanoid");
const path = require("path");
const postService = require("../services/postService");

// Create Post
exports.createPost = async (req, res) => {
  const { caption, tag } = req.body;
  const { imageContent } = req.files;
  const author = req.currentUser.payload.id;

  if (!caption) {
    return res.status(400).json({ message: "Caption is required" });
  }

  if (!imageContent) {
    return res.status(400).json({ message: "Caption is required" });
  }

  const uniqueFileNames = imageContent.map((file) => {
    const ext = path.extname(file.originalname);
    const uniqname = `${nanoid(10)}${ext}`;
    cb(uniqname);
  });

  const postData = {
    caption,
    tag,
    author,
    imageContent,
  };

  try {
    const saveData = await postService.createPost(postData);
    return res.status(200).json({ message: "Post succesfully created" });
  } catch (error) {
    return res.status(400).json({ mesage: error });
  }
};

// Edit Post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { caption, tag } = req.body;

  const newData = {
    caption,
    tag,
  };

  try {
    const saveData = await postService.updatePost(id, newData);
    return res.status(200).json({ message: "Post succesfully updated" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

//  Get user post
exports.getUserPost = async (req, res) => {
  const { userId } = req.params;

  try {
    const getUserPost = await postService.getUserPost(userId);
    return res
      .status(200)
      .json({ messege: "Data succesfully retreive", getUserPost });
  } catch (error) {
    return res.status(400).json({ messege: error });
  }
};

// Read all postingan
exports.getAllPost = async (req, res) => {
  try {
    const getAllPost = await postService.getAllPost();
    return res.status(201).json({ messege: "Data succesfully retreive" });
  } catch (error) {
    return res.status(400).json({ messege: error });
  }
};

exports.getPostDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const getData = await postService.getPostDetail(id);
    return res
      .status(201)
      .json({ messege: "Data succesfully retreive", getData });
  } catch (error) {
    return res.status(400).json({ messege: error });
  }
};
