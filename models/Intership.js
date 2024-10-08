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
    email: {
      type: String,
      required: true,
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
    jobdesk: {
      type: [String],
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    certificateNumber: { // Menambahkan field untuk nomor sertifikat
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model("Internship", internshipSchema);
module.exports = Internship;
