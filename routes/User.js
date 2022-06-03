const express = require("express");
const router = express.Router();
const User = require("../controllers/User");
const jwt = require("jsonwebtoken");

router.route("/login").get(User.authenticate_user).post(User.login_user);

router
	.route("/register")
	.get((req, res) => {
		res.render("register", { title: "Register" });
	})
	.post(User.create_user);

router.get("/verify" , (req, res) => {
	res.render("verify", { title: "verify" });
});

router.get("/forgotPassword/:email",User.reset_Password)

// router.use(User.authenticate); // middleware for auth //Note : not using this as this is again a general auth code, we going specific

router.get("/changePasswordPage",User.authenticate, User.change_Password_Page);

router.post("/changePassword",User.authenticate, User.change_password);

router.get("/dashboard/:email",User.authenticate, User.dashboard);

router.route("/logout").get(User.logout).post(User.logout);

// router.

module.exports = router;
