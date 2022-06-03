const express = require("express");
const router = express.Router();
const Class = require("../controllers/class");

router.route("/").get((req, res) => {
	res.render("class", { title: "class" });
});

router.route("/newBoard").post(Class.add_board);

router.route("/newStandard").post(Class.add_standard);

router.route("/newSubject").post(Class.add_subject);

router.route("/getBoard").get((Class.get_Board));

router.route("/getStandard").get((Class.get_Standard));

router.route("/getSubject").get((Class.get_Subject));

// router.route("/deleteBoard").get((Class.get_Subject));

router.route("/getTeacher/:subject").get(Class.get_Teacher);

router.route("/save").post(Class.save_class);

router.route("/edit").post(Class.edit_class);

router.route("/delete").post(Class.delete_class);

router.route("/count").get(Class.count_class);

router.route("/list").get(Class.list_classes);

router.route("/listStudents/:classId").get(Class.list_students);

router.route("/listAll")
.get(Class.list_all_classes);

module.exports = router;