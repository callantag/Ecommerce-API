const { Order , OrderProduct }  = require("./../models/Order");
const Product = require("./../models/Product");

module.exports.createOrder = (req,res) => {
	const orderProduct = new OrderProduct ({
		productId : req.body.productId
	})
	const order = new Order ({
		userId : req.user.id,
		products : orderProduct
	})
	// const prodPrice = prod.price;

	// // order.totalAmount +=prod.price

	orderProduct.save()
	order.save()
	// Product.findById(req.body.productId)
	// .then(product => res.send(product))
	.then(order => res.send(order))
	// .then(()=> res.send(order.totalAmount +=product.price))
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

// Middleware that increases the quantity in product
// exports.increaseQuantity = (req, res, next) => {
// 	let bulkOps = req.body.order.products.map((item) => {
// 		return {
// 			updateOne: {
// 				filter: { _id: item._id },
// 				update: { $inc: { quantity: +item.quantity } }
// 			}
// 		};
// 	});
// 	Product.bulkWrite(bulkOps, {}, (error, products) => {
// 		if (error) {
// 			return res.send('Could not update product quantity');
// 		}
// 		next();
// 	});
// };


// Non-admin User checkout (Create Order)
// Retrieve authenticated user’s orders
// Retrieve all orders (Admin only)



