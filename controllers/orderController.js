const Order = require("./../models/Order");

module.exports.createOrder = (req,res) => {
	//create a new Order
	let newOrder = new Order ({
		name : req.body.name,
		description : req.body.description,
		price : req.body.price
	})	
	newOrder.save()
	.then(() => res.send(true))
	.catch(() => res.send(false))
};

module.exports.getOrders = (req,res) => {
	// /:ID
	Order.findById(req.params.Id).then(order => {
		console.log(order)
		return res.send(order)
	})
};

module.exports.getAllOrders = (req,res) => {	
	Order.find().then(orders => res.send(orders))
};


// Non-admin User checkout (Create Order)
// Retrieve authenticated user’s orders
// Retrieve all orders (Admin only)


