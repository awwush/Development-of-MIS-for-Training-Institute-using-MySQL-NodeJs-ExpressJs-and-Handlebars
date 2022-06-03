const express = require("express");
const router = express.Router();

router.route("/topper-information")
    .get((req, res) => {
        res.render("view_topper", { title: "Topper" });
    })

    module.exports = router;