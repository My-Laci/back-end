const { nanoid } = require("nanoid");
const path = require("path");
const postService = require("../services/postService");
const userService = require("../services/userService");
const mediaService = require("../services/mediaService");
require("dotenv").config();

// Create Post
exports.createPost = async (req, res) => {
  const { caption, tag } = req.body;
  const imageContent = req.files;
  const author = req.currentUser.payload.id;
  console.log(author);
  const authorData = await userService.getUserById(author);
  const fullname = authorData.name;
  const agencyOrigin = authorData.agencyOrigin;

  if (!caption) {
    return res.status(400).json({ message: "Caption is required" });
  }

  if (imageContent.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  try {
    const uploadPromises = imageContent.map((file) =>
      mediaService.postMedia(file.buffer, file.originalname)
    );
    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.url);

    const tags = Array.isArray(tag) ? [...new Set(tag)] : [];

    const postData = {
      fullname,
      agencyOrigin,
      caption,
      tag,
      author,
      imageContent: imageUrls,
    };

    const saveData = await postService.createPost(postData);
    return res
      .status(200)
      .json({ message: "Post succesfully created", saveData });
  } catch (error) {
    return res.status(400).json({ mesage: error });
  }
};

// Edit Post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { caption, tag } = req.body;
  const imageContent = req.files;

  try {
    const checkPost = await postService.checkPost(id);

    if (!checkPost) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    let imageUrls = [];

    if (imageContent && imageContent.length > 0) {
      const uploadPromises = imageContent.map((file) =>
        mediaService.postMedia(file.buffer, file.originalname)
      );

      try {
        const uploadResults = await Promise.all(uploadPromises);
        imageUrls = uploadResults.map((result) => result.url);
      } catch (uploadError) {
        return res.status(400).json({
          message: "Failed to upload images",
          error: uploadError.message,
        });
      }
    }

    const newData = {
      caption,
      tag,
      imageContent: imageUrls,
    };

    await postService.updatePost(id, newData);

    return res.status(200).json({ message: "Post successfully updated" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to update post", error: error.message });
  }
};

//  Get user post
exports.getUserPost = async (req, res) => {
  // const { userId } = req.params;

  try {
    const getUserPost = await postService.getUserPost(req.params.id);
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
    return res.status(201).json({ getAllPost });
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

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postService.getPostDetail(postId);
    const imageUrls = post.imageContent;

    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      await Promise.all(imageUrls.map((url) => mediaService.deleteImage(url)));
    }

    const deletePostData = await postService.deletePost(postId);
    console.log(deletePostData);

    return res.status(200).json({
      message: "Post and associated images successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting post or images:", error);

    return res.status(500).json({
      message: "Failed to delete post and images",
      error: error.message,
    });
  }
};
