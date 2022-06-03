const validator = require("validator");
const {DataTypes} = require("sequelize");
const { sequelize }  = require("../models/db/mysql");
const { admin } = require("../models/Admin_Register");

const board = sequelize.define("boards_available", {
    id : {
		type: DataTypes.INTEGER,
        autoIncrement: true,
		primaryKey: true,
	},
    short_form : {
        type: DataTypes.STRING,
		allowNull: false,
    },
    full_form : {
        type: DataTypes.STRING,
		allowNull: true,
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
    indexes: [
        {
            unique: true,
            fields: ['short_form', 'institute_id']
        }
    ]
});


module.exports = { board };