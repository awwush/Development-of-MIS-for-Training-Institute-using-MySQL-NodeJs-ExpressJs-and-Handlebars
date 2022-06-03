require("../models/db/mysql");
const db = require("../models/db/mysql");
const { standard } = require("../models/standard");
const jwt = require("jsonwebtoken");


// Function which is used in admin route to fetch the standards
const list_standard = async function (req) {

	// console.log("in standard list standard");
	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	// console.log(user.id);
	var standards = await db.sequelize.query(`select
	standards_available.id,
	standards_available.name as name
	from standards_available
	where standards_available.institute_id = '${user.id}'`, {
		type: db.sequelize.QueryTypes.SELECT,
	}).catch(err => { 
		// console.log(err); 
	});

	// console.log(standards);
	return standards;

}

const edit_standard = async (req, res) => {
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

	standard
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
			toReturn["reason"] = "standard updated"


			res.send({
				status: "200",
				reason: "Successfully modified standard Details!! ",
				redirect: `/admin/board-standard-subject`
			});

		})
		.catch((err) => {
			if (err.fields.name_institute_id_unique != undefined) {
				res.send({ status: "422", reason: ` standard ${req.body.name} already exists` });
			} else {
				res.send({
					status: "500",
					reason: "Server issue, Not able to edit record!!",
				});
			}
			// console.log(err);
			// console.log(`standard edit catch ${err}`);
		});
}

const delete_standard = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	if (user.id) {
		// console.log(user.id);
		// console.log(req.body);

		standard.destroy({
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
module.exports = { list_standard, edit_standard, delete_standard };
