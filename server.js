require("./config/db.js");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { PORT } = process.env;
const app = express();
const whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    // Jika origin ada di dalam whitelist, izinkan akses
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Mengizinkan pengiriman kredensial
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));
app.use(cors(corsOptions));

app.use("/", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
