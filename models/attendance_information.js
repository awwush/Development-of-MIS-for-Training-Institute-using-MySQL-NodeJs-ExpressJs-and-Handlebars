const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { class_model } = require("./class");

const attendance_information = sequelize.define("attendance_information", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: class_model,
            key: 'id',
        }
    },
    scheduled_on: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    attendance_took_on: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    timestamps: false,
})

module.exports = { attendance_information };