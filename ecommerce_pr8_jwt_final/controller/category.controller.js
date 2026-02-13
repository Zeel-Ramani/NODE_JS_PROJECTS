
const Category = require("../model/category.model");

exports.all = async(req,res)=>{
 const categories = await Category.find();
 res.render("categories",{categories});
};

exports.add = async(req,res)=>{
 await Category.create({name:req.body.name});
 res.redirect("/categories");
};
