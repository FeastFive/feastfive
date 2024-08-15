const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_51");

dotenv.config();

const port = process.env.PORT || 4000;

//Middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));
app.use(bodyParser.json({ limit: "100mb" }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../build")));

//DB connection
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/meals", require("./routes/mealRoutes"));
app.use("/api", require("./routes/checkoutRoutes"));

//Server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
