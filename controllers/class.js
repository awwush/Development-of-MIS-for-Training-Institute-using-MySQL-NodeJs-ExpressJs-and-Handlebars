require("../models/db/mysql");
const db = require("../models/db/mysql");
const { board } = require("../models/board");
const { standard } = require("../models/standard");
const { subject } = require("../models/subject");
const { class_model } = require("../models/class");
const { teacher } = require("../models/teacher");
const { teacher_subject_details } = require("../models/teacher_subject_details")

const { admin } = require("../models/Admin_Register");
const mailjet = require("node-mailjet").connect(
	"af51f7d633a08ed6f5e4d37efaf822d5",
	"33a5d3fc55a4f69108d006212cdb4b41",
);
const jwt = require("jsonwebtoken");

const add_board = (req, res) => {
	// console.log(req.body.short_form);
	// console.log(req.body.long_form);

	jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
		// console.log(user.id);
		if (user) {
			board
				.create({
					short_form: req.body.short_form,
					full_form: req.body.long_form,
					institute_id: user.id,
				})
				.then(() => {
					res.send({ status: "200", reason: "Added successfully" });
				})
				.catch((err) => {
					// console.log(err);
					if (err.fields.shortname_institute_id_unique != undefined) {
						res.send({ status: "422", reason: ` board ${req.body.short_form} already exists` });
					} else {
						res.send({
							status: "500",
							reason: "Server issue, Not able to save record!!",
						});
					}
				});
		}
	});
};

const add_standard = (req, res) => {
	// console.log(req.body.newStandardName);
	// console.log(req.body.long_form);

	jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
		// console.log(user.id);
		if (user) {
			standard
				.create({
					name: req.body.newStandardName,
					// full_form: req.body.long_form,
					institute_id: user.id,
				})
				.then(() => {
					res.send({ status: "200", reason: "Added successfully" });
				})
				.catch((err) => {
					// console.log(err);
					if (err.fields.standard_institute_id_unique != undefined) {
						res.send({ status: "422", reason: ` standard ${req.body.newStandardName} already exists` });
					} else {
						res.send({
							status: "500",
							reason: "Server issue, Not able to save record!!",
						});
					}
				});
		}
	});
};

const add_subject = (req, res) => {
	// console.log(req.body.newSubjectName);

	jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
		// console.log(user.id);
		if (user) {
			subject
				.create({
					name: req.body.newSubjectName,
					// full_form: req.body.long_form,
					institute_id: user.id,
				})
				.then(() => {
					res.send({ status: "200", reason: "Added successfully" });
				})
				.catch((err) => {
					// console.log(err);
					if (err.fields.name_institute_id_unique != undefined) {
						res.send({ status: "422", reason: ` subject ${req.body.newSubjectName} already exists` });
					} else {
						res.send({
							status: "500",
							reason: "Server issue, Not able to save record!!",
						});
					}
				});
		}
	});
};

const get_Board = (req, res) => {
	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

	if (user) {
		board
			.findAll({
				attributes: ["id", "short_form"],
				where: {
					institute_id: user.id,
				},
			})
			.then((responses) => {
				// console.log(responses);
				var responsArray = [];
				responses.forEach((response) => {
					responsArray.push({ name: response.dataValues.short_form, id: response.dataValues.id });
				});
				res.send(responsArray);
			});
	}
};

const get_Subject = (req, res) => {
	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

	if (user) {
		subject
			.findAll({
				attributes: ["name", "id"],
				where: {
					institute_id: user.id,
				},
			})
			.then((responses) => {
				var responsArray = [];
				responses.forEach((response) => {
					responsArray.push({
						name: response.dataValues.name,
						id: response.dataValues.id,
					});
				});
				res.send(responsArray);
			});
	}
};

const get_Standard = (req, res) => {
	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

	if (user) {
		standard
			.findAll({
				attributes: ["id", "name"],
				where: {
					institute_id: user.id,
				},
			})
			.then((responses) => {
				var responsArray = [];
				responses.forEach((response) => {
					responsArray.push({ name: response.dataValues.name, id: response.dataValues.id });
				});
				res.send(responsArray);
			});
	}
};

const get_Teacher = async (req, res) => {

	teacherList = await db.sequelize.query(
		` SELECT teacher.id, teacher.name from  teacher_subject_details,  subjects_available,
	 teacher where  subjects_available.id = teacher_subject_details.subject_id and
	 teacher.id =  teacher_subject_details.teacher_id and subjects_available.id = ${req.params.subject}`,
		{
			// replacements: {id: carIds},
			type: db.sequelize.QueryTypes.SELECT,
		},
	);
	// console.log(teacherList);
	res.send(teacherList)


};

const save_class = async (req, res) => {
	// console.log("in saving controller");
	// console.log(req.body);

	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);


	class_model
		.create({
			// id: req.body.id,
			name: req.body.name,
			board_id: req.body.board_id,
			institute_id: user.id,
			teacher_id: req.body.teacher_id,
			subject_id: req.body.subject_id,
			standard_id: req.body.standard_id,
			fees: req.body.fees,
			// take into consideration
		}).then((response) => {
			res.send({
				"status": "200",
				"reason": "Class saved successfully",
				"redirect": `/users/dashboard/${user.email}`
			})
		}).catch((err) => {
			// console.log(err);
			if (err.fields.name_UNIQUE != undefined) {
				res.send({ status: "200", reason: " Class Name already Exists" });
			}
			else if (err.fields.name_institute_id_unique != undefined) {
				res.send({ status: "200", reason: ` class ${req.body.name} already exists` });
			}
			else {
				res.send({
					status: "500",
					reason: "Server issue, Not able to save record!!",
				});
			}


			// 	// -------------
			// 	res.send({"status": "500",
			// 				"reason": "not saved, Server Error!!"});
		})

};

const edit_class = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	var toReturn = {};
	// console.log(req.body);
	var mess = "";
	if (req.body.ClassName == "") mess += "class name, ";
	if (req.body.fees == "") mess += "fees, ";
	if (req.body.teacherId == "") mess += "teacher, ";

	if (mess != "") {
		mess += " required!";
		res.send({ "status": "422", "reason": mess });
		return;
	}

	class_model
		.update({
			name: req.body.className,
			fees: req.body.fees,
			teacher_id: req.body.teacherId,
		}, {
			where: {
				id: req.body.classId,
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
			toReturn["reason"] = "class updated"

			res.send({
				status: "200",
				reason: "Successfully modified class Details!! ",
				redirect: `/admin/class/list`
			});

		})
		.catch((err) => {
			if (err.fields.name_institute_id_unique != undefined) {
				res.send({ status: "422", reason: ` class ${req.body.className} already exists` });
			} else {
				res.send({
					status: "500",
					reason: "Server issue, Not able to edit record!!",
				});
			}
			// console.log(err);
			// 	TODO: handle a case where class name is alreay present for the institute and can't be changed
			// console.log(`class edit catch ${err}`);
		});
}

const delete_class = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	if (user.id) {
		// console.log(user.id);
		// console.log(req.body);

		class_model.destroy({
			where: {
				id: req.body.id,
				name: req.body.name
			}
		}).then((response) => {
			// console.log(`accepted ${response}`);
			res.send({
				"status": "200",
				"reason": "deleted successfully",
				"redirect": `/admin/class/list`
			})
		}, (response) => {
			// console.log(`rejected ${response}`);
			res.send({
				"status": "422",
				"reason": "coudn't delete, server issue!"
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


const count_class = async (req, res) => {

	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);

	class_model.findAndCountAll(
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

const list_classes = async (req, res) => {

	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	// console.log(user.id);
	classes = await db.sequelize.query(`select
	class.id,
	class.name as className,
	teacher.name as teacherName,
	teacher.id as teacherId,
	boards_available.short_form as boardsShort,
	boards_available.full_form as boardsFull,
	standards_available.name as standard,
	subjects_available.name as subject,
	subjects_available.id as subjectId,
	class.fees
	from class, teacher, boards_available, standards_available, subjects_available
	where class.institute_id = '${user.id}'
	and class.teacher_id = teacher.id
	and class.board_id = boards_available.id
	and class.standard_id = standards_available.id
	and class.subject_id = subjects_available.id`, {
		type: db.sequelize.QueryTypes.SELECT,
	}).catch(err => {
		// console.log(err)
	});

	// console.log(classes);
	res.render("class_list", { "title": "list of classes", classes });


}

const list_students = async (req, res) => {
	// console.log(req.params.classId)
	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	// console.log(user.id);

	students = await db.sequelize.query(`select
	student.id, student.name from student where student.id in (select class_student_details.student_id
	from class_student_details, class where 
	class_student_details.class_id = '${req.params.classId}')`, {
		type: db.sequelize.QueryTypes.SELECT,
	}).catch(err => {
		//  console.log(err)
	});

	res.send(students);
}

const list_all_classes = async (req, res) => {

	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	// console.log(user.id);
	classes = await db.sequelize.query(`select
	class.id,
	class.name
	from class
	where class.institute_id = '${user.id}'`, {
		type: db.sequelize.QueryTypes.SELECT,
	}).catch(err => {
		// console.log(err)
	});

	// console.log(classes);
	res.send(classes);


}

module.exports = {
	add_board,
	add_standard,
	add_subject,
	get_Board,
	get_Subject,
	get_Standard,
	get_Teacher,
	save_class,
	edit_class,
	delete_class,
	count_class,
	list_classes,
	list_students,
	list_all_classes
};