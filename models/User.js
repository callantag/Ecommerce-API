const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

	firstName : { type : String , required : true },
	lastName : { type : String , required : true },
	email : { type : String , required : true, unique : true },
	password : { type : String , required : true },
	isAdmin : { type: Boolean , default : false },
	mobileNo : { type : String , required : true }
	
});

module.exports = mongoose.model( "User" , UserSchema );


// firstname, lastname, mobileNo
// Email (string)
// Password (string)
// isAdmin (Boolean - defaults to false)