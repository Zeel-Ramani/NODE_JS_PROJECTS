
const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect("mongodb+srv://ZeelRamani:zeel1234@zeelramani.2xisn6j.mongodb.net/blog")
    .then(() => console.log("Database connected successfully..."))
    .catch(err => console.error("Database Connection Error:", err));
};

module.exports = dbconnect;