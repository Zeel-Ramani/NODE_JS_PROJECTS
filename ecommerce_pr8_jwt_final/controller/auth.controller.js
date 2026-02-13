
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{
 const hash = await bcrypt.hash(req.body.password,10);

 await User.create({
  username:req.body.username,
  password:hash
 });

 res.redirect("/login");
};

exports.login = async(req,res)=>{

 const user = await User.findOne({username:req.body.username});
 if(!user) return res.send("User Not Found");

 const match = await bcrypt.compare(req.body.password,user.password);
 if(!match) return res.send("Wrong Password");

 const token = jwt.sign(
  {id:user._id,role:user.role},
  process.env.JWT_SECRET
 );

 res.cookie("token",token);

 res.redirect("/dashboard");
};

exports.logout = (req,res)=>{
 res.clearCookie("token");
 res.redirect("/login");
};
