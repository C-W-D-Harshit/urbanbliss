require("dotenv").config(); // Load environment variables from .env file

module.exports = {
  apps: [
    {
      name: "urbanbliss",
      script: "backend/server.js", // Replace 'server.js' with the name of your custom server file
      exec_mode: "cluster",
      instances: "max",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        // Add other environment variables from your .env file here
        PORT: process.env.PORT,
        Purl: process.env.Purl,
        Durl: process.env.Durl,
        RPP: process.env.RPP,
        MONGO_URI: process.env.MONGO_URI,
        DB_PASS: process.env.DB_PASS,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRE: process.env.JWT_EXPIRE,
        COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,
        SMPT_HOST: process.env.SMPT_HOST,
        SMPT_PORT: process.env.SMPT_PORT,
        SMPT_SERVICE: process.env.SMPT_SERVICE,
        SMPT_PASSWORD: process.env.SMPT_PASSWORD,
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        // ...
      },
    },
  ],
};
