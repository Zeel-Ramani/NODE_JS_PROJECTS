const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
 name:String,
 price:Number,
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
 category:String
});

module.exports = mongoose.model("Product",productSchema);
