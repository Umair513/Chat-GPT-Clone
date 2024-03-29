const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected".bgGreen.white);
  } catch (error) {
    console.log(`MONGODB Error : ${error}`.red);
  }
};

module.exports = connectDB;
