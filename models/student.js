const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { admin } = require("./Admin_Register");
const { board } = require("../models/board");
const { standard } = require("../models/standard");


const student = sequelize.define('student', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	contact: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	date_of_birth: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	board_id: {
		type: DataTypes.INTEGER,
		references: {
			model: board,
			key: 'id',
		},
		allowNull: true,
	},
	standard_id: {
		type: DataTypes.INTEGER,
		references: {
			model: standard,
			key: 'id',
		},
		allowNull: true,
	},
	verification: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	institute_id: {
		type: DataTypes.STRING,
		references: {
			model: admin,
			key: 'id'
		},
	}
}, {
	timestamps: false,
});

module.exports = { student };