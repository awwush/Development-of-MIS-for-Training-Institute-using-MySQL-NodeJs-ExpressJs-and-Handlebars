require("../models/db/mysql");
const { admin } = require("../models/Admin_Register");
const jwt = require("jsonwebtoken");
const mailjet = require("node-mailjet").connect(
	"af51f7d633a08ed6f5e4d37efaf822d5",
	"33a5d3fc55a4f69108d006212cdb4b41",
);

const reset_Password = (req, res) => {
	// res.render("dashboard", { title: "dashboard" });
	console.log("in forgot Password!");
	const token = jwt.sign(
		{
			email: req.params.email,
		},
		process.env.ACCESS_TOKEN,
	);

	const randomResetPassword = require("crypto").randomBytes(7).toString("hex");

	admin
		.update(
			{ password: randomResetPassword, verification: 0 },
			{
				where: {
					email: req.params.email,
				},
			},
		)
		.then(() => {
			// ---------------------------------------------------------------------------------
			admin
				.findOne({
					attributes: [
						"id",
						"name",
						"institute_name",
						"mobile",
						"email",
						"verification",
						"password",
					],
					where: {
						email: req.params.email,
					},
				})
				.then((response) => {
					if (response != null) {
						const request = mailjet.post("send", { version: "v3.1" }).request({
							Messages: [
								{
									From: {
										Email: "1032180848@tcetmumbai.in",
										Name: "Master-Class",
									},
									To: [
										{
											Email: `${req.params.email}`,
											Name: `${response.name}`,
										},
									],
									Subject: "Reset Password OTP from Master-Class",
									TextPart: "Mail with OTP login details to reset Password",
									HTMLPart: `Dear ${response.name},<br> As You requested to change your Password, 
				Your OTP is <b>${response.password}</b> use it in place of old password and create a new password`,
								},
							],
						});
						request
							.then(
								(mailResponse) => {
									mailResponse.toString = function () {
										return JSON.stringify(this, null, 4);
									};
									// console.log(`${mailResponse}`);
									console.log(
										`mail block then promise accept status code: ${mailResponse.response.status}`,
									);
									// res.redirect("/users/verify");
								},
								(mailResponse) => {
									mailResponse.toString = function () {
										return JSON.stringify(this, null, 4);
									};
									console.log(
										`mail block then promise reject status code: ${mailResponse.response.status}`,
									);
									responseToBeReturned["mailStatus"] = "false";
								},
							)
							.catch((err) => {
								console.log(` Mail error : ${err} user id : ${req.body.id}`);
							});
					}
				});
			// -----------------------------------------------------------
		})
		.catch((err) => {
			res.json({
				status: false,
				reason: "Update failed. ServerErr",
			});
		});
	// TODO : 1) create a random password and save it in the corresponding users row
	// 		  2) send it over to the user using mailjet!

	res.cookie("jwt", token).redirect(`/users/changePasswordPage`);
	// req.params.email);
};

const create_user = (req, res) => {
	/// TODO: to verify in the db if user is already present

	req.body.password = require("crypto").randomBytes(7).toString("hex");
	var responseToBeReturned = {};

	admin
		.create({
			id: req.body.id,
			name: req.body.name,
			password: req.body.password,
			institute_name: req.body.institute_name,
			aadhaar: req.body.aadhaar,
			email: req.body.email,
			mobile: req.body.mobile,
			verification: 0, // take into consideration
		})
		.then(
			() => {
				console.log(`record saved with id : ${req.body.id}`);

				// we are sending an email consisting of password, this will act as a verification of the Email.

				const request = mailjet.post("send", { version: "v3.1" }).request({
					Messages: [
						{
							From: {
								Email: "1032180848@tcetmumbai.in",
								Name: "Master-Class",
							},
							To: [
								{
									Email: `${req.body.email}`,
									Name: `${req.body.name}`,
								},
							],
							Subject: "Verification Email from Master-Class",
							TextPart: "Verification Mail with login details",
							HTMLPart: `Dear ${req.body.name},<br> Thank You for choosing us to manage your institute.
					 Please use the username <b>${req.body.email}</b> password <b>${req.body.password}</b> to Log
					  into your account and start using it. <br> Thanking You, <br> Team Master-Class `,
						},
					],
				});
				request
					.then(
						(mailResponse) => {
							mailResponse.toString = function () {
								return JSON.stringify(this, null, 4);
							};
							// console.log(`${mailResponse}`);
							console.log(
								`mail block then promise accept status code: ${mailResponse.response.status}`,
							);
							res.redirect("/users/verify");
						},
						(mailResponse) => {
							mailResponse.toString = function () {
								return JSON.stringify(this, null, 4);
							};
							console.log(
								`mail block then promise reject status code: ${mailResponse.response.status}`,
							);
							responseToBeReturned["mailStatus"] = "false";
						},
					)
					.catch((err) => {
						console.log(` Mail error : ${err} user id : ${req.body.id}`);
					});

				// res.sendStatus(200);
			},
			(error) => {
				console.log(`record not saved with id : ${req.body.id}`);
				console.log(error);
				// res.send(error);

				// console.log(`promise reject while saving record ${error.fields.email_UNIQUE}`);
				// console.log(`promise reject while saving record ${error.fields.mobile_UNIQUE}`);
				// console.log(`promise reject while saving record ${error.fields.PRIMARY}`);
				// console.log(`promise reject while saving record ${error.fields.aadhaar_UNIQUE}`);

				var mess = ``;

				if (error.fields.mobile_UNIQUE != undefined) mess = mess + " mobile, "
				if (error.fields.email_UNIQUE != undefined) mess = mess + " email, ";
				if (error.fields.PRIMARY != undefined) mess = mess + " GST/PAN id, ";
				if (error.fields.aadhaar_UNIQUE != undefined) mess = mess + " Aadhaar, ";
				

				mess = mess + "already in use";

				// console.log(mess);

				responseToBeReturned["registrationStatus"] = "false";
				responseToBeReturned["reason"] = mess;
				res.json(responseToBeReturned);
			},
		);
};

const login_user = async (req, res) => {
	var responseToBeReturned = {};

	const result = await admin
		.findOne({
			attributes: [
				"id",
				"name",
				"institute_name",
				"mobile",
				"email",
				"verification",
			],
			where: {
				email: req.body.email,
				password: req.body.password,
			},
		})
		.catch((error) => {
			console.log(`Error logging in for email address ${req.body.email}`);
			responseToBeReturned["found"] = false;
			responseToBeReturned["reason"] = "Query execution was unsuccesful";

			res.json(responseToBeReturned);
		});
	if (result === null) {
		console.log(`No user found ${req.body.email}`);
		responseToBeReturned["found"] = false;
		responseToBeReturned["reason"] = "Either username or password is invalid";
		res.json(responseToBeReturned);
	} else {
		console.log(`${result.name} just came back.. with id ${result.id}`);
		const details = {
			id: result.id,
			name: result.name,
			instituteName: result.institute_name,
			email: result.email,
			mobile: result.mobile,
		};
		const token = jwt.sign(details, process.env.ACCESS_TOKEN);
		// res.cookie("jwt", token).redirect(`/users/dashboard/${result.email}`);

		if (result.verification == 1)
			res.cookie("jwt", token).redirect(`/users/dashboard/${result.email}`);
		else {
			res.cookie("jwt", token).redirect("/users/changePasswordPage");
			// res.render('change-password',{title: "change-password"});
			// res.send("working perfectly fine");
		}
	}
};

const change_password = (req, res) => {
	// console.log(`old Password : ${req.body.old}`);
	// console.log(`new Password : ${req.body.new}`);

	jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
		admin
			.update(
				{
					verification: "1",
					password: req.body.new,
				},
				{
					where: {
						email: user.email,
						password: req.body.old,
					},
				},
			)
			.then((result) => {
				// console.log(result[0]);
				if (result[0] === 1) {
					// console.log("milgaya");

					res.redirect(`/users/dashboard/${user.email}`);
				} else {
					// console.log("nai mila");

					res.json({
						status: "false",
						reason: "Update failed. Enter correct Old Password!",
					});
				}
			})
			.catch((err) => {
				res.json({
					status: false,
					reason: "Update failed. ServerErr",
				});
			});
	});
};

const change_Password_Page = (req, res) => {
	res.render("change-password", { title: "change-password" });
};

const dashboard = (req, res) => {
	jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
		if (user) {
			if (user.email === req.params.email) {
				res.render("dashboard", { title: "Dashboard", values: user });
			} else {
				res.render("404Page", { title: "404! not found" });
			}
		}
	});
	// console.log("params : ", req.params.email);
	// res.render("dashboard", {title : "Dashboard",values : User.user_details});
};

const authenticate_user = (req, res) => {
	if (req.cookies.jwt) {
		jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
			if (user) {
				res.redirect(`/users/dashboard/${user.email}`);
			}
			if (err) {
				// console.log(`JWT cookie : ${req.cookies.jwt} couldn't be processed`);
				res.redirect(`/users/logout`);
			}
		});
	} else res.render("login", { title: "Login" });
};

const logout = (req, res) => {
	res.clearCookie("jwt").redirect("/users/login");
};

const authenticate = (req, res, next) => {
	if (req.cookies.jwt) {
		jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
			if (user) {
				next();
			}
			if (err) {
				// console.log(`JWT cookie : ${req.cookies.jwt} couldn't be processed`);
				res.redirect(`/users/logout`);
			}
		});
	} else {
		// console.log("authenticate!!!");
		res.render("login", { title: "Login" });
	}
};

// function user_details_request(req, res) {
// 	if (req.cookies.jwt) {
// 		jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
// 			if (user) {
// 				console.log(`User mobile user_details_Request ${user.mobile}`);
// 				res.json(user);
// 			}
// 			if (err) {
// 				console.log(`user_details_request JWT cookie : ${req.cookies.jwt} couldn't be processed`);
// 				res.json({"error" : "true"});
// 			}
// 		});
// 	}
// 	else{
// 		console.log("else user_Details_Request");
// 	}
// }

const user_details = {
	values: "",
};
const forgot_Password = (req, res) => {};

module.exports = {
	authenticate,
	dashboard,
	change_Password_Page,
	logout,
	create_user,
	login_user,
	authenticate_user,
	user_details,
	change_password,
	reset_Password,
};
