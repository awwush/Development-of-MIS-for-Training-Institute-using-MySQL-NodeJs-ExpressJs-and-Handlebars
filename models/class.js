const validator = require("validator");
const {DataTypes} = require("sequelize");
const { sequelize }  = require("../models/db/mysql");
const { admin } = require("../models/Admin_Register");
const { teacher } = require("../models/teacher");
const { board } = require("../models/board");
const { standard } = require("../models/standard");
const { subject } = require("../models/subject");

const class_model = sequelize.define("class", {
    id : {
		type: DataTypes.INTEGER,
        autoIncrement: true,
		primaryKey: true,
	},
    teacher_id : {
        type: DataTypes.INTEGER,
        references: {
            model: teacher,
            key: 'id',
        },
        allowNull: false,
    },
    name : {
        type: DataTypes.STRING,
		allowNull: false,
    },
    board_id : {
        type: DataTypes.INTEGER,
        references: {
            model: board,
            key: 'id',
        },
        allowNull: false,
    },
    standard_id : {
        type: DataTypes.INTEGER,
        references: {
            model: standard,
            key: 'id',
        },
        allowNull: false,
    },
    subject_id : {
        type: DataTypes.INTEGER,
        references: {
            model: subject,
            key: 'id',
        },
        allowNull: false,
    },
    fees : {
        type: DataTypes.STRING,
		allowNull: false,
    },
    institute_id : {
        type: DataTypes.STRING,
        references: {
            model: admin,
            key: 'id',
        }
    }
}, {
	timestamps: false,
    // unique: {
    //     name_institute_id_unique: {
    //         fields: ['name', 'institute_id']
    //     }
    // }
    indexes: [
        {
            unique: true,
            fields: ['name', 'institute_id']
        }
    ]
});


module.exports = { class_model };