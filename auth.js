const jwt = require('jsonwebtoken');
const secret = "ecommerceapi";

module.exports.createAccessToken = (user) =>{

	// generate token
	let payload = {
		id : user._id,
		email : user.email,
		isAdmin : user.isAdmin
	}

	return jwt.sign(payload, secret)

}

module.exports.verify = (req,res,next) =>{
	
	let token = req.headers.authorization;
	if (typeof token === "undefined"){
		res.send({auth:"failed"})
	} else {
		
		token = token.slice(7,token.length)

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

module.exports.verifyNotAdmin = (req,res,next) => {
	//req.user - decode payload from token
	if(!req.user.isAdmin) {
		next()
	} else {
		res.send(false)
	}
}

module.exports.verifyAdmin = (req,res,next) => {
	//req.user - decode payload from token
	if(req.user.isAdmin) {
		next()
	} else {
		res.send(false)
	}
}