require("../models/db/mysql");
const db = require("../models/db/mysql");
const { topper_information } = require("../models/topper_information");
// const multer  = require('multer')
// const upload = multer({dest: '/uploads/'});

const save_image = (req, res) => {
    console.log("Here in save image controller");
    console.log(req.file);
    // console.log(req.files.topperPhoto);
    res.send({"status": "200"});
}   

const save = async (req, res) => {
    
}

module.exports = { save_image, save};