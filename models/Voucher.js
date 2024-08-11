const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  batch: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Voucher", VoucherSchema);
