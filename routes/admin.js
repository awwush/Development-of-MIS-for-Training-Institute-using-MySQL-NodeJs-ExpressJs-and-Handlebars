const express = require("express");
const admin = require("../controllers/admin");
const router = express.Router();
const Class = require("./class");
const Teacher = require("./teacher");
const Student = require("./student");
const Board = require("./board");
const Standard = require("./standard");
const Subject = require("./subject");
const BoardController = require("../controllers/board");
const SubjectController = require("../controllers/subject");
const StandardController = require("../controllers/standard");
const Mail = require("./mail");
const Topper = require("../controllers/topper");

// const multer = require('multer')
// const upload = multer({dest: '/uploads/'});

router.use("/class", Class);


router.route("/student")
    .get((req, res) => {
        // console.log("get student worked Here");
        res.render("student", { title: "student" });
    })

router.route("/student/saveSingle")
    .post((req, res) => { admin.create_student });

router.use("/teacher", Teacher);

router.use("/student", Student);

router.route("/board-standard-subject")
    .get(async (req, res) => {
        var boards = await BoardController.list_board(req);
        var standards = await StandardController.list_standard(req);
        var subjects = await SubjectController.list_subject(req);

        res.render("board_standard_subject", { title: "Board-Standard-Subject", boards, standards, subjects });
    })

router.use("/board", Board);

router.use("/standard", Standard);

router.use("/subject", Subject);

router.use("/mail", Mail)

router.route("/topper")
    .get(async (req, res) => {
        // const upload = multer({dest: '/uploads/'});
        res.render("create_topper", { title: "Topper information" });
    })

router.route("/topper/saveImage")
    .get((req, res) => res.send("Hi topper save image"))
    .post(Topper.save_image);

router.route("/topper/save")
    .post(Topper.save);

module.exports = router;