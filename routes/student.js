const express = require("express");
const router = express.Router();
const Student = require("../controllers/student");

router.route("/").get((req, res) => {
    // console.log("get student worked Here");
    res.render("student", { title: "student" });
});

router.route("/count").get(Student.count_students);

router.route("/save").post(Student.get_fees, Student.save_student);

router.route("/getClasses").get(Student.get_class);

router.route("/list")
    .get(Student.list_students);

router.route("/classes/:id")
    .get(Student.list_classes);

router.route("/unEnrolledClasses")
    .get(Student.list_un_enrolled_classes);

router.route("/class/add")
    .post(Student.add_class);

router.route("/class/delete")
    .post(Student.delete_class);

router.route("/edit")
    .post(Student.edit_student);

router.route("/delete")
    .post(Student.delete_student);

router.route("/parent/:id")
    .get(Student.show_parents);

module.exports = router;