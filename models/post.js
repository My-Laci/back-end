const mongoose = require("mongoose");
const { buffer } = require("stream/consumers");

const PostSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageContent: {
      type: [String], // array of image URLs
    },
    tag: {
      type: [String],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);
