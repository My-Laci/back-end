const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// Simple storage setup for multer without GridFS
const storage = multer.memoryStorage();

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|mp4|mkv|avi/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

exports.upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10MB limit per file
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).array("images", 3);