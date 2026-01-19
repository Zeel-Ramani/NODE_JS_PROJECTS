const mongoose = require("mongoose")

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://ZeelRamani:zeel1234@zeelramani.2xisn6j.mongodb.net/blog")
    console.log("Database connected successfully...")
  } catch (error) {
    console.error("Database Connection Error:", error)
    process.exit(1)
  }
}

module.exports = dbConnect