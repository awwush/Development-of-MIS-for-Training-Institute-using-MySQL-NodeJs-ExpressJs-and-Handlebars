const express = require("express");
const router = express.Router();
const StandardController = require("../controllers/standard");

router.route("/").get((req, res) => res.send("Hi"));

router.route("/edit").post(StandardController.edit_standard);

router.route("/delete").post(StandardController.delete_standard);

module.exports = router;