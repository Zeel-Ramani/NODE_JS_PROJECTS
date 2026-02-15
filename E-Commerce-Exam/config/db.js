const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ZeelRamani:zeel1234@zeelramani.2xisn6j.mongodb.net/E-Commerce-Exam"
    );

    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

module.exports = dbconnection;