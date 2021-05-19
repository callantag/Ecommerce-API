// const { Order , OrderProduct }  = require("./../models/Order");
const Order  = require("./../models/Order");
const Product = require("./../models/Product");

module.exports.createOrder = (req,res) => {
	Order.create({
		userId: req.user.id,
		productId: req.body.productId,
		quantity: req.body.quantity
	})
	.then(()=> {
		return Order.findOne({userId: req.user.id})
	})
	.then((order)=>{
		Product.findById(req.body.productId)
		.then(product => {
			let subtotalValue = product.price*req.body.quantity
			order.totalAmount +=subtotalValue
			order.products.push({
				productId: req.body.productId,
				quantity: req.body.quantity,
				subtotal: subtotalValue
			})
			order.save()
			.then((updatedOrder)=>{
				res.send(updatedOrder)
			})
		})
	}, {new:true})
	.catch(err => res.send(err))
}


// module.exports.createOrder = (req,res) => {
// 	const orderProduct = new OrderProduct ({
// 		productId : req.body.productId,
// 		quantity : req.body.quantity
// 	})
// 	const order = new Order ({
// 		userId : req.user.id,
// 		products : orderProduct
// 	})
// 	orderProduct.save()
// 	order.save()
// 	.then(order => res.send(order))
// 	.catch(err => res.send(err))
// };


module.exports.getOrders = (req,res) => {
	Order.find({userId: req.user.id})

	.then( orders => res.send(orders))
	.catch( err => res.send( err ))
};

module.exports.getAllOrders = (req,res) => {	
	Order.find()
	.then( orders => res.send( orders ))
	.catch( err => res.send( err ))
}


// Non-admin User checkout (Create Order)
// Retrieve authenticated user’s orders
// Retrieve all orders (Admin only)



