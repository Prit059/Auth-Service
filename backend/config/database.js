const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
    })
    console.log("Connect Database.");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}

module.exports = connectDB;