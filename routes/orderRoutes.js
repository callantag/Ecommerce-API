const router = require("express").Router();
const { 
	createOrder, 
	getUserOrders, 
	getAllOrders
} = require("./../controllers/OrderController");
const { verify , verifyNotAdmin, verifyAdmin } = require("./../auth");

router.post("/", verify, verifyNotAdmin, createOrder);

router.get("/:userId", getUserOrders);

router.get("/all", verify, verifyAdmin, getAllOrders);

module.exports = router;

// Non-admin User checkout (Create Order)
// Retrieve authenticated user’s orders
// Retrieve all orders (Admin only)


