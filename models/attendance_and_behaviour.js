const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { attendance_information } = require("./attendance_information");
const { student } = require("./student");

const attendance_behaviour = sequelize.define("attendance_and_behaviour", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: attendance_information,
            key: 'id',
        }
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: student,
            key: 'id',
        }
    },
    status: {
        type: DataTypes.ENUM('absent', 'present'),
        allowNull: false,
    },
    behaviour: {
        type: DataTypes.ENUM('good', 'attentive', 'dull', 'careless'),
        allowNull: false,
    }
}, {
    timestamps: false,
})

module.exports = { attendance_behaviour };