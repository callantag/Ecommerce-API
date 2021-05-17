const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	
	totalAmount : { type : Number , default : 3 }, 
	userId : {
		type : mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	products : [
		{
			productId :  {
				type : mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true
			},
			quantity :  { type : Number , default : 1 },
			subtotal :  { type : Number , default : 2 }
		}
	]
}, {timestamps:{createdAt: "purchasedOn"}});

module.exports = mongoose.model( "Order" , OrderSchema );



// totalAmount (number)
// purchasedOn (Date - defaults to current date of creation)
// userId (string)
// products: [subdocument array of bought products:
  
//   {
//     productId: (string)
//     Stretch Goal:
//     quantity: (number)
//     subtotal: (number)
//   }

// ]