const Product = require("./../models/Product");

module.exports.getAllActive = (req,res) => {	
	Product.find({isActive: true}).then(products => {
		return res.send(products)
	})
};

module.exports.getAllProducts = (req,res) => {	
	Product.find().then(products => res.send(products))
};

module.exports.getProduct = (req,res) => {
	Product.findById(req.params.productId).then(product => {
		return res.send(product)

	})
};

module.exports.createProduct = (req,res) => {
	let newProduct = new Product ({
		name : req.body.name,
		description : req.body.description,
		price : req.body.price
	})	
	newProduct.save()
	.then(() => res.send(true))
	.catch(() => res.send(false))
};

module.exports.updateProduct = (req,res) => {	
	let updatedProduct = {

		name: req.body.name,
		description: req.body.description,
		price: req.body.price

	}

	Product.findByIdAndUpdate(req.params.productId, updatedProduct)
	.then(()=>res.send(true))
	.catch(()=>res.send(false))
} 


module.exports.archiveProduct = (req,res) => {
	let updateActive = {
		isActive: false
	}

	Product.findByIdAndUpdate(req.params.productId,updateActive)
	.then(()=>res.send(true))
	.catch(()=>res.send(false))
	
};



// Retrieve all active products
// Add subtotal and item quantity in products subdocument
// Retrieve single product
// Create Product (Admin only)
// Update Product information (Admin only)
// Archive Product (Admin only)