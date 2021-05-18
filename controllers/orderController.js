const { Order , OrderProduct }  = require("./../models/Order");
const Product  = require("./../models/Product");

module.exports.createOrder = (req,res) => {
	const orderProduct = new OrderProduct ({
		productId : req.body.productId,
		quantity : req.body.quantity
	})
	const order = new Order ({
		userId : req.user.id,
		products : orderProduct
	})
	orderProduct.save()
	order.save()
	.then(order => res.send(order))
	.catch(err => res.send(err))
};

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

// Order.update(
	//     {userId: req.user.id, "productId": req.body.productId},
	//     {$inc: {"products.$.quantity": Order.quantity}}
	// )
// const updatedtotal = OrderProduct.aggregate([
//   {
//     $group: {
//       _id:null,
//       totalAmount: {
//         $sum:"$subtotal"
//       }
//     }
//   }
// ])

//totalAmount = {$sum:"$subtotal"}
//quantity = count: {$sum: 1}
// subtotal = Product.price * OrderProduct.quantity



// Non-admin User checkout (Create Order)
// Retrieve authenticated user’s orders
// Retrieve all orders (Admin only)



