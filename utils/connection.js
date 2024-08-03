const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://devserv8252:tWJ5cfq29y8EaoTj@myserver.qcrmqwn.mongodb.net/ecoconecthub",
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
