const express = require("express");
const router = express.Router();

const categoryCtrl = require("../controller/category.controller");

router.get("/", categoryCtrl.categoryPage);
router.post("/add", categoryCtrl.addCategory);

module.exports = router;
