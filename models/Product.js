const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	
	name : { type : String , required : true },
	description : { type : String, required : true },
	price : { type : Number , required : true },
	isActive : { type: Boolean , default : true }
}, {timestamps:{createdAt: "createdOn"}});

module.exports = mongoose.model( "Product" , ProductSchema );


// Name (string)
// Description (string)
// Price (number)
// isActive (Boolean - defaults to true)
// createdOn (Date - defaults to current date of creation)