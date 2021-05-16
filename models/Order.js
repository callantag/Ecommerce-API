const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	
	totalAmount : { type : Number , required : true },
	purchasedOn :  { type : Date , default : new Date() }, 
	userId : { type : String , required : true },
	products : [
		{
			productId :  { type : String , required : true },
			quantity :  { type : Number , default : 0 },
			subtotal :  { type : Number , default : 0 }
		}
	]
});

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