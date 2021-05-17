const Order = require("./../models/Order");

module.exports.createOrder = (req,res) => {
	console.log(req.user.id)
	console.log(req.body.productId)
	Order.create({
		userId : req.user.id,
		courseId : req.body.productId
	})
	.then( order => {
		res.send(order)
	})
	.catch( err => res.send(err))
}

module.exports.getOrders = (req,res) => {
	Order.findById(req.params.Id).populate(['userId', 'productId'])
	.then( orders => res.send( orders ))
	.catch( err => res.send( err ))
};

module.exports.getAllOrders = (req,res) => {	
	Order.find().populate(['userId', 'productId'])
	.then( orders => res.send( orders ))
	.catch( err => res.send( err ))
}



// Non-admin User checkout (Create Order)
// Retrieve authenticated user’s orders
// Retrieve all orders (Admin only)


