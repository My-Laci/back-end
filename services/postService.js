const Post = require("../models/post");

exports.createPost = async (postData) => {
  const data = postData;
  console.log(data);
  const saveData = new Post(postData);
  return await saveData.save();
};

exports.updatePost = async (id, newData) => {
  const postingan = await Post.findByIdAndUpdate(id, newData, { new: true });
  return postingan;
};

exports.getUserPost = async (userId) => {
  const getPost = await Post.find(userId);
  return getPost;
};

exports.getAllPost = async () => {
  const getPost = await Post.find();
  return getPost;
};

exports.getPostDetail = async (id) => {
  const getDetailPost = await Post.findById(id);
  return getDetailPost;
};
