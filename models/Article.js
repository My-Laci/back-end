const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  data: Buffer, // This stores the binary data of the image
  contentType: String, // This stores the MIME type of the image
});

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
    images: [ImageSchema], // Use the ImageSchema to define the structure of each image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
