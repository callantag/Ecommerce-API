const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // structure
    totalAmount: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            subtotal: {
                type: Number
            }
        }
    ]
}, { timestamps: { createdAt: 'purchasedOn'}});

module.exports = mongoose.model('Order', orderSchema);

// const mongoose = require("mongoose");
// const User = require("./User");
// const Product = require("./Product");

// const OrderProductSchema = new mongoose.Schema ({
// 	productId :  {
// 		type : mongoose.Schema.Types.ObjectId,
// 		ref: "Product",
// 		required: true
// 	},
// 	quantity :  { type : Number , required: true }
// 	// subtotal :  { type : Number , default : 0 }
// })

// const OrderProduct = mongoose.model( "OrderProduct" , OrderProductSchema );


// const OrderSchema = new mongoose.Schema({
	
// 	// totalAmount : { type : Number , default : 0 }, 
// 	userId : {
// 		type : mongoose.Schema.Types.ObjectId,
// 		ref: "User",
// 		required: true
// 	},
// 	products : [OrderProductSchema]
// }, {timestamps:{createdAt: "purchasedOn"}});

// const Order = mongoose.model( "Order" , OrderSchema )


// module.exports = { OrderProduct , Order }



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

