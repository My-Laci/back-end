const mongoose = require("mongoose");
const { Schema } = mongoose;

const internshipSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    positions: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model("Internship", internshipSchema);
module.exports = Internship;
