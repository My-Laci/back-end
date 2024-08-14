const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  profileImg: { type: String },
  token: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
