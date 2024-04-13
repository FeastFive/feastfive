const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

dotenv.config();

const port = process.env.PORT || 4000;

//Middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../build")));

//DB connection
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));

//Server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});