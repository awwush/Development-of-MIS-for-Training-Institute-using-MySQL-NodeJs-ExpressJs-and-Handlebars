const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { teacher } = require("./teacher");


const teacher_payment = sequelize.define('teacher_payment', {
    teacher_id: {
        type: DataTypes.INTEGER,
        references: {
            model: teacher,
            key: 'id'
        },
    },
    amount_paid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: false,
});

module.exports = { teacher_payment };