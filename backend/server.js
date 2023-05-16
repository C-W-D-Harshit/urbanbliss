const express = require("express");
const next = require("next");
const connectDatabase = require("./config/database");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const cloudinary = require("cloudinary");

app.prepare().then(() => {
  const server = express();

  server.get("/api/product", (req, res) => {
    res.send("noob");
  });

  // For all other routes, use Next.js handler
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  // Handling Uncaught Exception
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

  // Connecting to database
  connectDatabase();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("Express server ready on http://localhost:3000");
  });
  // Unhandled Promise Rejection
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
      process.exit(1);
    });
  });
});
