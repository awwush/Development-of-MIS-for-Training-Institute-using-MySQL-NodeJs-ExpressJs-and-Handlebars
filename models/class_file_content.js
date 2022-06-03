const validator = require("validator");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../models/db/mysql");
const { class_content } = require("./class_content");

const class_file_content = sequelize.define("class_file_content", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    class_content_id: {
        type: DataTypes.INTEGER,
        references: {
            model: class_content,
            key: 'id',
        },
        allowNull: false,
    },
    class_content_uploaders_id: {
        type: DataTypes.INTEGER,
        references: {
            model: class_content,
            key: 'uploaded_by_id',
        },
        allowNull: false,
    },
    file_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    file_content: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: false,
            fields: ['class_content_id']
        }, {
            unique: false,
            fields: ['class_content_uploaders_id']
        }
    ]
});


module.exports = { class_file_content };