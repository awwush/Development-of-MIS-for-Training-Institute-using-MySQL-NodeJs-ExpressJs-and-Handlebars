const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { subject } = require("../models/subject");
const { teacher } = require("../models/teacher");

const teacher_subject_details = sequelize.define("teacher_subject_details", {
    teacher_id : {
        type: DataTypes.INTEGER,
        references: {
            model: teacher,
            key: 'id'
        },
        allowNull: true,
        primaryKey: true,
    },
    subject_id : {
        type: DataTypes.INTEGER,
        references: {
            model: subject,
            key: 'id'
        },
        allowNull: true,
        primaryKey: true,
    },

}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['teacher_id', 'subject_id']
        }
    ]
});

module.exports = { teacher_subject_details }