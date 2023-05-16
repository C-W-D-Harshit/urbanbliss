import mongoose from "mongoose";

function initDB() {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to DB");
    return;
  }
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log(`Connected to DB`);
  });
  mongoose.connection.on("error", (err) => {
    console.log(`Error connecting to DB: ${err}`);
  });
}

export default initDB();
