const User = require("./../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("./../auth");

module.exports.register = (req,res,next) => {
	
	if( 
		req.body.password.length < 8 || req.body.password !== req.body.confirmPassword
	) return res.send(false)

	const hash = bcrypt.hashSync(req.body.password, 9);
	req.body.password = hash;

	let newUser = new User({
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		password : req.body.password,
		mobileNo : req.body.mobileNo
	})

	newUser.save()
	.then(() => res.send(true))
	.catch(() => res.send(false))
};

// User authentication
module.exports.login = (req,res) => {
	User.findOne({ email : req.body.email })
	.then( user => {
		if(!user) {
			res.send(false)
		} else {
			let matchedPW = bcrypt.compareSync(req.body.password , user.password);
			if(!matchedPW) {
				res.send(false)
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
		isAdmin: req.body.isAdmin
	}
	User.findByIdAndUpdate(req.params.userId, setToAdmin)
	.then(()=>res.send(true))
	.catch(()=>res.send(false))
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
	User.findByIdAndUpdate(req.params.userId, editedProfile)
	.then(()=>res.send(true))
	.catch(()=>res.send(false))
}