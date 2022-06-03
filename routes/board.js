const express = require("express");
const router = express.Router();
const Board = require("../controllers/board");

router.route("/").get((req, res) => res.send("Hi"));

router.route("/delete").post(
    Board.delete_board
);

router.route("/edit").post(
    Board.edit_board
);
module.exports = router;