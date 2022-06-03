const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { student } = require("../models/student");
const { class_model } = require("../models/class");

const class_student_details = sequelize.define("class_student_details", {
    class_id: {
        type: DataTypes.INTEGER,
        references: {
            model: class_model,
            key: 'id'
        },
        allowNull: false,
    },
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: student,
            key: 'id'
        },
        allowNull: false,
    },

}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['class_id', 'student_id']
        }
    ]
});

module.exports = { class_student_details };