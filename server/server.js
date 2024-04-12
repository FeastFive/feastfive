const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const connectDB = require("./config/db");
var cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static(path.resolve(__dirname, "../build")));

const url = process.env.DATABASE;
const dbName = process.env.DBNAME;
const server = http.createServer(app);

connectDB();

//Routes
//for user
app.use("/api/users", require("./routes/userRoutes"));

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
