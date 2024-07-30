require("./config/database.js");

const express = require('express');
const cors = require("cors");
const { PORT } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})