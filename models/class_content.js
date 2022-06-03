const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { class_model } = require("./class");

const class_content = sequelize.define("class_content", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    class_id: {
        type: DataTypes.INTEGER,
        references: {
            model: class_model,
            key: 'id',
        },
        allowNull: false,
    },
    by_student: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    by_teacher: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uploaded_by_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    indexes: [
        {
            unique: false,
            fields: ['uploaded_by_id']
        }
    ]
});


module.exports = { class_content };