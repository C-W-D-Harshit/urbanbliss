const express = require("express");
const next = require("next");
const connectDatabase = require("./config/database");
const dev = process.env.NODE_ENV !== "production";
const serv = next({ dev });
const handle = serv.getRequestHandler();
const cloudinary = require("cloudinary");
const app = require("./app");

serv.prepare().then(() => {
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
  app.use((req, res, next) => {
    // Check the user's role here based on your authentication system
    // For example, if the user's role is stored in a cookie
    const user_ = req.cookies.user;
    let user = null;
    let userRole = "";
    if (user_) {
      user = JSON.parse(user_);
      userRole = user.role;
    }
    const token = req.cookies.token;
    if ((req.path === "/login" || req.path === "/signup") && token) {
      return res.redirect("/account");
    }

    // If the user is not an admin, redirect to login or show an error message
    if (req.path === "/admin" && userRole !== "admin") {
      return res.redirect("/login"); // Redirect to login page
      // Or return an error response
      // return res.status(403).json({ error: "Access denied. You must be an admin to access this page." });
    }

    // If the user has the required role, continue to the next middleware
    next();
  });

  app.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const server = app.listen(process.env.PORT, (err) => {
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
