const mongoose = require("mongoose");
const { buffer } = require("stream/consumers");

const PostSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageContent: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostSchema);
