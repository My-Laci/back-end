const { nanoid } = require("nanoid");
const Voucher = require("../models/Voucher");

exports.createVoucherBatch = async (batchName, quantity) => {
  const vouchers = [];

  for (let i = 0; i < quantity; i++) {
    const voucher = new Voucher({
      code: nanoid(),
      batch: batchName,
    });
    vouchers.push(voucher);
  }

  await Voucher.insertMany(vouchers);
  return vouchers;
};

exports.validateVoucher = async (code) => {
  const voucher = await Voucher.findOne({ code, isActive: true });

  if (!voucher) {
    throw new Error("Invalid or inactive voucher.");
    return voucher;
  }

  voucher.isActive = false;
  await voucher.save();

  return voucher;
};

exports.getVouchersByUser = async (userId) => {
  // Assuming a user field is added in the Voucher model when it's used.
  return await Voucher.find({ userId });
};

exports.getAllVouchers = async () => {
  const vouchers = await Voucher.find();

  // Group vouchers by batch name
  const groupedVouchers = vouchers.reduce((acc, voucher) => {
    const { batch } = voucher;
    if (!acc[batch]) {
      acc[batch] = [];
    }
    acc[batch].push(voucher);
    return acc;
  }, {});

  return groupedVouchers;
};

exports.deleteVoucherBatch = async (batchName) => {
  const result = await Voucher.deleteMany({ batch: batchName });
  return result;
};
