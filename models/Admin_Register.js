const validator = require("validator");
const {DataTypes} = require("sequelize");
const { sequelize}  = require("../models/db/mysql");


const admin = sequelize.define('admin', {
	id : {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	name : {
		type: DataTypes.STRING,
		allowNull: false,
	},
	institute_name : {
		type: DataTypes.STRING,
		allowNull: false,
	},
	aadhaar : {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	mobile : {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email : {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password : {
		type: DataTypes.STRING,
		allowNull: false,
	},
	verification : {
		type: DataTypes.STRING,
		allowNull: false,
	}
});

module.exports = {admin};