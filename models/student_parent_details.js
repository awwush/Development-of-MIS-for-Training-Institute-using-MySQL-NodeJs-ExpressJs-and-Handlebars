const validator = require("validator");
const {DataTypes} = require("sequelize");
const { sequelize }  = require("../models/db/mysql");
const { student } = require("./student");


const student_parent = sequelize.define('student_parent_details', {
    student_id : {
		type: DataTypes.INTEGER,
		references: {
			model: student,
			key: 'id'
		},
	},
	father_name : {
		type: DataTypes.STRING,
		allowNull: false,
	},
    mother_name : {
		type: DataTypes.STRING,
		allowNull: false,
	},
	contact : {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	email : {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	}
}, {
	timestamps: false,
});

module.exports = { student_parent };