const express = require("express");
const router = express.Router();
const Teacher = require("../controllers/teacher");

router.route("/")
    .get((req, res) => {
        res.render("teacher", { title: "teacher" });
    });

router.route("/attendance")
    .get((req, res) => {
        res.render("teacher_attendance", { title: "Attendance" });
    });

router.route("/save")
    .post(Teacher.save_teacher);

router.route("/edit")
    .post(Teacher.edit_teacher);

router.route("/delete")
    .post(Teacher.delete_teacher);

router.route("/count")
    .get(Teacher.count_teachers);

router.route("/list")
    .get(Teacher.list_teachers);

router.route("/subjects/:id")
    .get(Teacher.get_subjects);

router.route("/unAssignedSubjects/:id")
    .get(Teacher.get_unAssignedSubjects);

module.exports = router;