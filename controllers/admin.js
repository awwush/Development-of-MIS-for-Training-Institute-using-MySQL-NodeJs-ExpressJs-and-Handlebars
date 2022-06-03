require("../models/db/mysql");
const { student } = require("../models/student");

const create_student = (req, res) => {
    req.body.password = require("crypto").randomBytes(7).toString("hex");
	var responseToBeReturned = {};

	student.create({
		name: req.body.name,
		password: req.body.password,
		class: req.body.class,
		email: req.body.email,
		mobile: req.body.mobile,
		verification: 0 // take into consideration
	}).then(() => {
		console.log(`student record saved with autoincrement id`);

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
			.then((mailResponse) => {
				mailResponse.toString = function () { return JSON.stringify(this, null, 4); }
				console.log(`${mailResponse}`);
				console.log(`mail block then promise accept status code: ${mailResponse.response.status}`);
                responseToBeReturned["mailStatus"]  = mailResponse.response.status;
                res.json(responseToBeReturned);
			},
				(mailResponse) => {
					mailResponse.toString = function () { return JSON.stringify(this, null, 4); }
					console.log(`mail block then promise reject status code: ${mailResponse.response.status}`);
					responseToBeReturned["mailStatus"] = mailResponse.response.status;
				})
			.catch((err) => {
				console.log(` Mail error : ${err}`);
			});

		// res.sendStatus(200);
	}, (error) => {
		console.log(`record not saved with id`);

		console.log(`promise reject while saving record ${error.parent.errno}`);
		responseToBeReturned["registrationStatus"] = "false";
		responseToBeReturned["reason"] = "Id already in use";
		res.json(responseToBeReturned);
	})
}


module.exports = { student };