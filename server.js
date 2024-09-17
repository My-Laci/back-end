require("./config/db.js");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { PORT } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));
app.use(cors({
  origin: '*'
}));

app.use("/", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
