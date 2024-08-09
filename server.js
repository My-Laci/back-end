require("./config/db.js");

const express = require("express");
const cors = require("cors");
const { PORT } = process.env;
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init gfs
let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = Date.now() + "-" + file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", require("./routes/routes"));

// API endpoint to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

// API endpoint to retrieve files by filename
app.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
