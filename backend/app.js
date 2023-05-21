const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

app.use(express.json({ limit: "100mb" }));

app.use(cookieParser());

// Parse application/x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(fileUpload());
// app.use(cors());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Route Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");

//Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
