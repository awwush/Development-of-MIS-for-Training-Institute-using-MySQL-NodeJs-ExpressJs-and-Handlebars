const express = require("express");
const router = express.Router();
const SubjectController = require("../controllers/subject");

router.route("/").get((req, res) => res.send("Hi"));

router.route("/edit").post(SubjectController.edit_subject);

router.route("/delete").post(SubjectController.delete_subject);

router.route("/teachers/:id").get(SubjectController.get_teachers);


module.exports = router;