
const mongoose = require("mongoose");

const connectDB = async()=>{
 try{
  await mongoose.connect("mongodb+srv://ZeelRamani:zeel1234@zeelramani.2xisn6j.mongodb.net/ecommerce");
  console.log("MongoDB Connected");
 }catch(err){
  console.log(err);
 }
};

module.exports = connectDB;
