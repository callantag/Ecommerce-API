const jwt = require('jsonwebtoken');
const secret = "ecommerceapi";

module.exports.createAccessToken = (user) =>{

	// generate token
	let payload = {
		id : user._id,
		email : user.email,
		isAdmin : user.isAdmin
	}
	
	// let token = jwt.sign(payload, secret)
	// res.send({access : token})

	return jwt.sign(payload, secret)

}

module.exports.verify = (req,res,next) =>{
	// check if token is existing
	let token = req.headers.authorization;
	if (typeof token === "undefined"){
		res.send({auth:"failed"})
	} else {
		// extract token, remove "Bearer " from token
		token = token.slice(7,token.length)

		// verify token
		jwt.verify(token, secret, function(err, decoded) {
			// console.log(decoded)
		  	if( err ){
		  		res.send({ auth: "failed"})
		  	} else {
		  		req.user = decoded
		  		next()
		  	}
		});
	}
}

//create middleware to verify if user is not admin:
module.exports.verifyNotAdmin = (req,res,next) => {
	//req.user - decode payload from token
	if(!req.user.isAdmin) {
		next()
	} else {
		res.send(false)
	}
}


//create middleware to verify if user is admin:
module.exports.verifyAdmin = (req,res,next) => {
	//req.user - decode payload from token
	if(req.user.isAdmin) {
		next()
	} else {
		res.send(false)
	}
}