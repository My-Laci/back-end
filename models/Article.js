const mongoose = require("mongoose");

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
      required: true,
    },
    images: [
      {
        type: String, // Store the filename(s) of the images
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
