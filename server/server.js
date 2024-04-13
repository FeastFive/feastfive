const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const port = process.env.PORT || 4000;

//Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../build")));

//DB connection
connectDB();

//Routes
app.use("/api/users", require("./routes/userRoutes"));

//Server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
