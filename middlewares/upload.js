const multer = require("multer");
const path = require("path");

// Simple storage setup for multer
const storage = multer.memoryStorage();

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

// Middleware for uploading up to 3 images
exports.upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10MB limit per file
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).array("images", 3);
