require("../models/db/mysql");
const db = require("../models/db/mysql");
const { subject } = require("../models/subject");
const jwt = require("jsonwebtoken");


// Function which is used in admin route to fetch the subjects
const list_subject = async function (req) {

	// console.log("in subjects list subject");
	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	// console.log(user.id);
	var subjects = await db.sequelize.query(`select
	subjects_available.id,
	subjects_available.name as name
	from subjects_available
	where subjects_available.institute_id = '${user.id}'`, {
		type: db.sequelize.QueryTypes.SELECT,
	}).catch(err => {
		// console.log(err);
	});

	// console.log(subjects);
	return subjects;

}

const edit_subject = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	var toReturn = {};
	// console.log(req.body);
	var mess = "";
	if (req.body.name == "") mess += "name, ";

	if (mess != "") {
		mess += " required!";
		res.send({ "status": "422", "reason": mess });
		return;
	}

	subject
		.update({
			name: req.body.name,
		}, {
			where: {
				id: req.body.id,
				institute_id: user.id,
			}
		}).then((response) => {

			// console.log(response);
			if (response == 0) { // no row to be updated
				res.send({
					status: "200",
					reason: "No change requested",
				});
				return;
			}
			toReturn["reason"] = "subject updated"


			res.send({
				status: "200",
				reason: "Successfully modified subject Details!! ",
				redirect: `/admin/board-standard-subject`
			});

		})
		.catch((err) => {
			if (err.fields.name_institute_id_unique != undefined) {
				res.send({ status: "422", reason: ` subject ${req.body.name} already exists` });
			} else {
				res.send({
					status: "500",
					reason: "Server issue, Not able to edit record!!",
				});
			}
			// console.log(err);
			// console.log(`subject edit catch ${err}`);
		});
}

const delete_subject = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	if (user.id) {
		// console.log(user.id);
		// console.log(req.body);

		subject.destroy({
			where: {
				id: req.body.id,
				name: req.body.name
			}
		}).then((response) => {
			// console.log(`accepted ${response}`);
			res.send({
				"status": "200",
				"reason": "deleted successfully",
				"redirect": `/admin/board-standard-subject`
			})
		}, (response) => {
			// console.log(`rejected ${response}`);
			res.send({
				"status": "422",
				"reason": "coudn't delete, server issue!"
			})
		})
			.catch((err) => {
				// console.log(err);
				res.send({
					"status": "422",
					"reason": "deletion failed, server error"
				})
			})

	}
}

const get_teachers = async (req, res) => {

	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	// console.log(req.params.id);

	teachers = await db.sequelize.query(
		`SELECT  teacher.name FROM teacher WHERE teacher.institute_id = '${user.id}'
		and teacher.id in 
	    (SELECT teacher_subject_details.teacher_id from teacher_subject_details
		where teacher_subject_details.subject_id = ${req.params.id})`,
		{
			// replacements: {id: carIds},
			type: db.sequelize.QueryTypes.SELECT,
		},

	);
	// console.log(teachers);
	res.send(teachers);


}
module.exports = { list_subject, edit_subject, delete_subject, get_teachers };
