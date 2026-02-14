const router = require("express").Router();
const prod = require("../controllers/product.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/", verifyToken, prod.createProduct);
router.get("/", verifyToken, prod.getAllProducts);
router.get("/my", verifyToken, prod.getMyProducts);
router.delete("/:id", verifyToken, prod.deleteProduct);

module.exports = router;
