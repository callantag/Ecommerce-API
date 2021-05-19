const User = require("./../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("./../auth");

module.exports.register = (req,res,next) => {
	
	if( req.body.password.length < 8) return res.send("Please create a password with at least 8 characters.")
	if( req.body.password !== req.body.confirmPassword) return res.send("Please make sure that passwords match.")

	const hash = bcrypt.hashSync(req.body.password, 9);
	req.body.password = hash;

	let newUser = new User({
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		password : hash,
		mobileNo : req.body.mobileNo
	})

	newUser.save()
	.then(() => res.send("Registered a new user."))
	.catch( err => res.send(err))
};

// User authentication
module.exports.login = (req,res) => {
	User.findOne({ email : req.body.email })
	.then( user => {
		if(!user) {
			res.send("Email not recognized. Please register before logging in.")
		} else {
			let matchedPW = bcrypt.compareSync(req.body.password , user.password);
			if(!matchedPW) {
				res.send("Please make sure to input the correct password.")
			} else {
				res.send ({ access : createAccessToken(user)})
			}
		}
	}).catch( err => {
		console.log("catch", err)
	})
}

// Set user as admin (Admin only)
module.exports.setAdmin = (req,res) => {
	let setToAdmin = {
		isAdmin : true
	}
	User.findByIdAndUpdate(req.params.userId, setToAdmin)
	.then(()=>res.send("User set as admin."))
	.catch(()=>res.send("Unable to set user as admin."))
}

module.exports.getDetails = (req,res) => {

	User.findById(req.user.id, {password : 0}) 
		.then(user => {
			res.send(user)
		})
		.catch(err => {
			res.send(err)
		})
}

//Edit user profile (Non-Admin Only)
module.exports.editProfile = (req,res) => {
	let editedProfile = {
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		password : req.body.password,
		mobileNo : req.body.mobileNo
	}
	User.findByIdAndUpdate(req.user.id, editedProfile)
	.then(()=>res.send("Profile successfully updated."))
	.catch(()=>res.send("Unable to update your profile."))
}