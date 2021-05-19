const router = require("express").Router()

const {
	register,
	login,
	setAdmin,
	getDetails, 
	editProfile
} = require("./../controllers/userController");
const { verify, verifyNotAdmin, verifyAdmin } = require("./../auth");

router.post("/register", register);

router.post("/login", login);

router.put("/:userId/setAdmin", verify, verifyAdmin, setAdmin);

router.get("/details/:userId", verify, getDetails);

router.put("/editProfile", verify, verifyNotAdmin, editProfile);

module.exports = router;