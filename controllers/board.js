require("../models/db/mysql");
const db = require("../models/db/mysql");
const { board } = require("../models/board");
const jwt = require("jsonwebtoken");


// Function which is used in admin route to fetch the boards
const list_board = async function (req) {

	// console.log("in boards list board");
	const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	// console.log(user.id);
	var boards = await db.sequelize.query(`select
	boards_available.id,
	boards_available.short_form as shortForm,
	boards_available.full_form as fullForm
	from boards_available
	where boards_available.institute_id = '${user.id}'`, {
		type: db.sequelize.QueryTypes.SELECT,
	}).catch(err => console.log(err));

	// console.log(boards);
	return boards;

}


const edit_board = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	var toReturn = {};
	// console.log(req.body);
	var mess = "";
	if (req.body.shortForm == "") mess += "short form, ";
	if (req.body.fullForm == "") mess += "full form, ";

	if (mess != "") {
		mess += " required!";
		res.send({ "status": "422", "reason": mess });
		return;
	}

	board
		.update({
			short_form: req.body.shortForm,
			full_form: req.body.fullForm,
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
			toReturn["reason"] = "board updated"


			res.send({
				status: "200",
				reason: "Successfully modified board Details!! ",
				redirect: `/admin/board-standard-subject`
			});

		})
		.catch((err) => {
			if (err.fields.shortname_institute_id_unique != undefined) {
				res.send({ status: "422", reason: ` board ${req.body.shortForm} already exists` });
			} else {
				res.send({
					status: "500",
					reason: "Server issue, Not able to edit record!!",
				});
			}
			// console.log(err);
			// console.log(`board edit catch ${err}`);
		});
}


const delete_board = async (req, res) => {
	const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
	if (user.id) {
		// console.log(user.id);
		// console.log(req.body);

		board.destroy({
			where: {
				id: req.body.id,
				short_form: req.body.name
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

module.exports = { list_board, edit_board, delete_board };
