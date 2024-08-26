const voucherService = require("../services/voucherService");

exports.createVoucherBatch = async (req, res) => {
  try {
    const { batchName, quantity } = req.body;

    const vouchers = await voucherService.createVoucherBatch(
      batchName,
      quantity
    );

    const response = {
      [batchName]: vouchers,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllVouchers = async (req, res) => {
  try {
    const groupedVouchers = await voucherService.getAllVouchers();
    res.status(200).json(groupedVouchers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVouchersByBatch = async (req, res) => {
  try {
    const { batchName } = req.params;
    const vouchers = await voucherService.getVouchersByBatch(batchName);
    if (vouchers.length === 0) {
      return res
        .status(404)
        .json({ message: "No vouchers found for this batch." });
    }
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateVoucher = async (req, res) => {
  try {
    const { code } = req.body;
    const voucher = await voucherService.validateVoucher(code);
    res
      .status(200)
      .json({ message: "Voucher validated successfully.", voucher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVouchersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const vouchers = await voucherService.getVouchersByUser(userId);
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVoucherBatch = async (req, res) => {
  try {
    const { batchName } = req.params;
    const result = await voucherService.deleteVoucherBatch(batchName);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No vouchers found for this batch." });
    }

    res.status(200).json({ message: "Vouchers deleted successfully.", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
