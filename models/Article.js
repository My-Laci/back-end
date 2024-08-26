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
    authorName : {
      type : String,
      required : true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String, // Store the URL of the image
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
