
const jwt = require("jsonwebtoken");

exports.verifyUser = (req,res,next)=>{
 const token = req.cookies.token;

 if(!token) return res.redirect("/login");

 try{
  const data = jwt.verify(token,process.env.JWT_SECRET);
  req.user = data;
  next();
 }catch{
  res.redirect("/login");
 }
};

exports.adminOnly = (req,res,next)=>{
 if(req.user.role!=="admin") return res.send("Admin Only");
 next();
};
