const router = require("express").Router();
const cat = require("../controllers/category.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");

router.post("/", verifyToken, isAdmin, cat.createCategory);
router.get("/", verifyToken, cat.getCategories);
router.put("/:id", verifyToken, isAdmin, cat.updateCategory);
router.delete("/:id", verifyToken, isAdmin, cat.deleteCategory);

module.exports = router;
