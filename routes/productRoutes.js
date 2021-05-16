const router = require("express").Router();
const { 
	getAllActive, 
	getAllProducts, 
	getProduct, 
	createProduct, 
	updateProduct, 
	archiveProduct
} = require("./../controllers/productController");
const { verify , verifyAdmin } = require("./../auth");

router.get("/", getAllActive);

router.get("/all", getAllProducts);

router.get("/:productId", getProduct);

router.post("/", verify, verifyAdmin, createProduct);

router.put("/:productId", verify, verifyAdmin, updateProduct);

router.put("/:productId/archive", verify, verifyAdmin, archiveProduct);

module.exports = router;


// Retrieve all active products
// Add subtotal and item quantity in products subdocument
// Retrieve single product
// Create Product (Admin only)
// Update Product information (Admin only)
// Archive Product (Admin only)