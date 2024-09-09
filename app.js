const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

app.use("/uploads", express.static("public/uploads"));
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

const userRoutes = require("./routes/userRoutes");
const pinRoutes = require("./routes/pinRoutes");
const boardRoutes = require("./routes/boardRoutes");

app.use("/api/users", userRoutes);
app.use("/api/pins", pinRoutes);
app.use("/api/boards", boardRoutes);

module.exports = app;
