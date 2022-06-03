const express = require("express");
const router = express.Router();
const Mail = require("../controllers/mail");

router.route("/")
    .get((req, res) => res.send("Hi mail here"))

router.route("/allStudents")
    .post(Mail.allStudents);

router.route("/allTeachers")
    .post(Mail.allTeachers);

router.route("/allParents")
    .post(Mail.allParents);

// router.route("/standard")
// .post()


module.exports = router;