const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
var cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    link: "*",
  })
);

connectDB();

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
