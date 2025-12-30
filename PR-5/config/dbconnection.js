const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect("mongodb://localhost:27017/Movies")
        .then(() => console.log("Database connected successfully..."))
        .catch(err => console.error("Database Connection Error:", err));
};

module.exports = dbconnect;