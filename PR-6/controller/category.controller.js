const Category = require("../model/category.model");

// Page
exports.categoryPage = async (req, res) => {
  const categories = await Category.find();
  res.render("category/manage", { categories });
};

// Add
exports.addCategory = async (req, res) => {
  await Category.create(req.body);
  res.redirect("/admin/category");
};
