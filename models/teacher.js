const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { admin } = require("../models/Admin_Register");


const teacher = sequelize.define('teacher', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
            key: 'id',
        }
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
	timestamps: false,
});

module.exports = { teacher };