const mongoose = require("mongoose");
const { buffer } = require("stream/consumers");

const PostSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    agencyOrigin: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    tag: [
      {
        type: String,
      },
    ],
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
