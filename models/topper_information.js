const validator = require("validator");
const {DataTypes} = require("sequelize");
const { sequelize }  = require("../models/db/mysql");
const { student } = require("./student");
const { class_model } = require("./class");


const topper_information = sequelize.define('topper_information', {
    class_id : {
		type: DataTypes.INTEGER,
        allowNull: true,
		references: {
			model: class_model,
			key: 'id'
		},
	},
    student_id : {
		type: DataTypes.INTEGER,
		references: {
			model: student,
			key: 'id'
		},
	},
	image_url : {
		type: DataTypes.STRING,
		allowNull: true,
	}
}, {
	timestamps: false,
});

module.exports = { topper_information };