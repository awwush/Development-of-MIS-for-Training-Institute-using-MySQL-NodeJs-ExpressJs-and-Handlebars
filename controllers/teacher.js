require("../models/db/mysql");
const db = require("../models/db/mysql");
const jwt = require("jsonwebtoken");
const { teacher } = require("../models/teacher");

const mailjet = require("node-mailjet").connect(
	"af51f7d633a08ed6f5e4d37efaf822d5",
	"33a5d3fc55a4f69108d006212cdb4b41",
);
const { response } = require("express");

const save_teacher = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	const randomPassword = require("crypto").randomBytes(7).toString("hex");

	// console.log(req.body);
	var mess = "";
	if (req.body.nameq == "") mess += "name, ";
	if (req.body.mobNo == "") mess += "mobile no, ";
	if (req.body.email == "") mess += "email, ";
	if (req.body.salary == "") mess += "salary, ";
	if (req.body.subject.length == 0) mess += "subject, ";

	if (mess != "") {
		mess += " required!";
		res.send({ "status": "422", "reason": mess });
		return;
	}

	if (req.body.birthday == "") bday = null;
	else {
		var date = new Date(req.body.birthday);
		var bday = date.toISOString().slice(0, 19).replace("T", " ");
	}
	// console.log(bday);

	teacher
		.create({
			name: req.body.nameq,
			data_of_birth: bday,
			mobile: req.body.mobNo,
			email: req.body.email,
			verification: 0,
			password: randomPassword,
			institute_id: user.id,
			salary: req.body.salary,
		})
		.then((response) => {
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
								Name: `${req.body.nameq}`,
							},
						],
						Subject: "Verification Email from Master-Class",
						TextPart: "Verification Mail with login details",
						HTMLPart: `Dear ${req.body.nameq},<br> <b>${user.instituteName}</b> has added you as one of their teaching staff 
             Please use the username <b>${req.body.email}</b> password <b>${randomPassword}</b> to Log
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
						console.log(
							`mail block then promise accept status code: ${mailResponse.response.status}`,
						);
						teacher
							.findOne({
								attributes: ["id"],
								where: {
									email: req.body.email,
								},
							})
							.then((response) => {
								// console.log(req.body.subject); // array of all the subjects selected
								// console.log(response.dataValues.id); // teachers id
								req.body.subject.forEach((subject) => {
									db.sequelize.query(
										`INSERT INTO teacher_subject_details VALUES (${response.dataValues.id},${subject})`,
										{
											type: db.sequelize.QueryTypes.INSERT,
										},
									);
								});
							});
						res.send({
							status: "200",
							reason: "Successfully Saved Teacher Details!! ",
							redirect: `/users/dashboard/${user.email}`
						});
					},
					(mailResponse) => {
						mailResponse.toString = function () {
							return JSON.stringify(this, null, 4);
						};
						console.log(
							`mail block then promise reject status code: ${mailResponse.response.status}`,
						);
						res.send({
							status: "200",
							reason: "Successfully Saved Teacher Details!! ",
						});
					},
				)
				.catch((err) => {
					console.log(` Mail error : ${err} user id : ${req.body.id}`);
					res.send({
						status: "200",
						reason: "Successfully Saved Teacher Details!! ",
					});
				});
		})
		.catch((err) => {
			if (err.fields.mobile_UNIQUE != undefined)
				res.send({ status: "200", reason: "Mobile Number Already in use!" });
			else if (err.fields.email_UNIQUE != undefined)
				res.send({ status: "200", reason: "Email Already in use!" });
			else res.send({ status: "500", reason: "Server Error!!" });
		});
};


const edit_teacher = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

	// console.log(req.body);
	var mess = "";
	if (req.body.nameq == "") mess += "name, ";
	if (req.body.mobNo == "") mess += "mobile no, ";
	if (req.body.salary == "") mess += "salary, ";

	if (mess != "") {
		mess += " required!";
		res.send({ "status": "422", "reason": mess });
		return;
	}

	// if (req.body.birthday == "") bday = null;
	// else {
	// 	var date = new Date(req.body.birthday);
	// 	var bday = date.toISOString().slice(0, 19).replace("T", " ");
	// }

	teacher
		.update({
			name: req.body.nameq,
			// data_of_birth: bday,
			mobile: req.body.mobNo,
			salary: req.body.salary,
		}, {
			where: {
				id: req.body.id,
			}
		})
		.then((response) => {
			// console.log(response);
			// console.log(`teacher update ${response}`);

			if (req.body.addSubjects == false && response == 0){
				res.send({
					status: "422",
					reason: "No change requested",
				});
				return;
			}
			// if (response == 0) { // no row to be updated
			// 	res.send({
			// 		status: "422",
			// 		reason: "No change requested",
			// 	});
				
			// }

			teacher
				.findOne({
					attributes: ["id"],
					where: {
						id: req.body.id,
					},
				})
				.then((response) => {
					// console.log(req.body.subject); // array of all the subjects selected
					// console.log(response.dataValues.id); // teachers id
					req.body.subject.forEach((subject) => {
						db.sequelize.query(
							`INSERT INTO teacher_subject_details VALUES (${response.dataValues.id},${subject})`,
							{
								type: db.sequelize.QueryTypes.INSERT,
							},
						);
					});
				});
			res.send({
				status: "200",
				reason: "Successfully modified Teacher Details!! ",
				redirect: `/admin/teacher/list`
			});

		})
		.catch((err) => {
			// console.log(`teacher update catch ${err}`);
		});
};


const delete_teacher = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	if (user.id) {
		// console.log(user.id);
		// console.log(req.body);

		teacher.destroy({
			where: {
				mobile: req.body.mobNo
			}
		}).then((response) => {
			// console.log(`accepted ${response}`);
			res.send({
				"status": "200",
				"reason": "deleted successfully",
				"redirect": `/admin/teacher/list`
			})
		}, (response) => {
			// console.log(`rejected ${response}`);
			res.send({
				"status": "422",
				"reason": "coudn't delete"
			})
		})
			.catch((err) => {
				res.send({
					"status": "422",
					"reason": "deletion failed, server error"
				})
			})

	}
}


const count_teachers = async (req, res) => {

	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

	teacher.findAndCountAll(
		{
			where: {
				institute_id: user.id,
			}
		}
	).then((responses) => {

		res.send({ "status": "200", "count": `${responses.count}` });
	})
		.catch(err => {
			// console.log(err);
			res.send({ "status": "500", "count": "0" });
		})
}

const list_teachers = async (req, res) => {

	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

	teacher.findAll({
		attributes: ["id", "name", "salary", "mobile", "email", "date_of_birth"],
		where: {
			institute_id: user.id,
		}
	})
		.then((responses) => {

			var teachers = [];
			responses.forEach((response) => {
				teachers.push({
					id: response.dataValues.id, name: response.dataValues.name,
					salary: response.dataValues.salary, mobile: response.dataValues.mobile,
					email: response.dataValues.email, date_of_birth: response.dataValues.date_of_birth
				});
			});

			res.render("teacher_list", { "title": "list of teachers", teachers });
		})

}

const get_subjects = async (req, res) => {

	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	// console.log(req.params.id);

	subjects = await db.sequelize.query(
		`SELECT  subjects_available.name FROM subjects_available WHERE subjects_available.institute_id = '${user.id}'
		and subjects_available.id in 
	    (SELECT teacher_subject_details.subject_id from teacher_subject_details
		where teacher_subject_details.teacher_id = ${req.params.id})`,
		{
			// replacements: {id: carIds},
			type: db.sequelize.QueryTypes.SELECT,
		},

	);
	// console.log(subjects);
	res.send(subjects);


}

const get_unAssignedSubjects = async (req, res) => {

	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	// console.log(req.params.id);

	subjects = await db.sequelize.query(
		`SELECT  subjects_available.id, subjects_available.name FROM subjects_available WHERE subjects_available.institute_id = '${user.id}'
		and subjects_available.id not in 
	    (SELECT teacher_subject_details.subject_id from teacher_subject_details, subjects_available
		where teacher_subject_details.teacher_id = '${req.params.id}')`,
		{
			// replacements: {id: carIds},
			type: db.sequelize.QueryTypes.SELECT,
		},

	).catch(err => {
		// console.log(err);
	});
	// console.log(subjects);
	res.send(subjects);

}

module.exports = {
	count_teachers,
	list_teachers,
	save_teacher,
	edit_teacher,
	delete_teacher,
	get_subjects,
	get_unAssignedSubjects
};

