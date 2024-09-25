const Post = require("../models/post");
const User = require("../models/User");

exports.createPost = async (postData) => {
  const data = postData;
  console.log(data);
  const saveData = new Post(postData);
  return await saveData.save();
};

exports.checkPost = async (id) => {
  const post = await Post.findById(id);
  return post;
};

exports.updatePost = async (id, newData) => {
  console.log(newData);
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updatedPost) {
      throw new Error("Post not found");
    }
    return updatedPost;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUserPost = async (userId) => {
  const getPost = await Post.find({ author: userId })
    .populate("author", "name agencyOrigin profileImg");
  return getPost;
};

exports.getAllPost = async () => {
  const getPost = await Post.find()
    .populate("author", "name agencyOrigin profileImg")
    .sort({ createdAt: -1 });

  return getPost;
};

exports.getPostDetail = async (id) => {
  const getDetailPost = await Post.findById(id)
    .populate("author", "name agencyOrigin profileImg");
  return getDetailPost;
};

exports.deletePost = async (postId) => {
  const result = await Post.findByIdAndDelete(postId);
  return result;
};
