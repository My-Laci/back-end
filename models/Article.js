const mongoose = require("mongoose");
const { buffer } = require("stream/consumers");

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageFilename: {
      type: buffer, // Store the filename of the image in GridFS
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
