require("./config/db.js");

const express = require("express");
const cors = require("cors");
const path = require("path");
const { PORT } = process.env;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/", require("./routes/routes"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
