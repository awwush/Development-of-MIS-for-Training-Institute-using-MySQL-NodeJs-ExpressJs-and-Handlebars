const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { student } = require("./student");


const student_fee = sequelize.define('student_fee_details', {
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: student,
            key: 'id'
        },
    },
    total_amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paid: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    due: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    }
}, {
    timestamps: false,
});

module.exports = { student_fee };