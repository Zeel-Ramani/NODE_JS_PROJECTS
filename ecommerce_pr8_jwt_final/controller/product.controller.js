const Product = require("../model/product.model");

// Dashboard
exports.dashboard = async(req,res)=>{

 const products = await Product.find().populate("user");

 res.render("dashboard",{products});
};

// Add Product
exports.add = async(req,res)=>{

 await Product.create({
  name:req.body.name,
  price:req.body.price,
  user:req.user.id,
  category:req.body.category
 });

 res.redirect("/dashboard");
};

// My Products
exports.my = async(req,res)=>{

 const products = await Product.find({user:req.user.id});

 res.render("myProducts",{products});
};

// Delete
exports.delete = async(req,res)=>{

 await Product.findByIdAndDelete(req.params.id);

 res.redirect("back");
};

// Edit Page
exports.editPage = async(req,res)=>{

 const product = await Product.findById(req.params.id);

 res.render("editProduct",{product});
};

// Update
exports.update = async(req,res)=>{

 await Product.findByIdAndUpdate(req.params.id,{
  name:req.body.name,
  price:req.body.price,
  category:req.body.category
 });

 res.redirect("/dashboard");
};
