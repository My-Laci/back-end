const multer = require("multer");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const mongoose = require("mongoose");

// Menggunakan koneksi dari db.js
const conn = mongoose.connection;

const storage = new GridFsStorage({
  db: conn, // Menggunakan koneksi yang sudah ada
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        console.log(filename, fileInfo);
        resolve(fileInfo);
      });
    });
  },
});

console.log("satu");

exports.upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("image");

console.log("dua");

const checkFileType = (file, cb) => {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  console.log("atas");
  console.log("File type check:", extname, mimetype);

  if (mimetype && extname) {
    console.log("File type check:", extname, mimetype);
    // console.log(cb);
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }

  console.log("bawah");
};
