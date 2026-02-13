
const router = require("express").Router();

const auth = require("../controller/auth.controller");
const product = require("../controller/product.controller");
const category = require("../controller/category.controller");
const {verifyUser,adminOnly} = require("../middleware/auth");

router.get("/",(req,res)=>res.redirect("/login"));

router.get("/login",(req,res)=>res.render("login"));
router.get("/register",(req,res)=>res.render("register"));

router.post("/register",auth.register);
router.post("/login",auth.login);

router.get("/logout",auth.logout);

router.get("/dashboard",verifyUser,product.dashboard);
router.get("/my-products",verifyUser,product.my);

router.post("/product/add",verifyUser,product.add);

router.get("/categories",verifyUser,category.all);
router.post("/categories/add",verifyUser,adminOnly,category.add);

// Edit
router.get("/product/edit/:id",verifyUser,product.editPage);

router.post("/product/update/:id",verifyUser,product.update);

// Delete
router.get("/product/delete/:id",verifyUser,product.delete);


module.exports = router;
