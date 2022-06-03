const validator = require("validator");
const {DataTypes} = require("sequelize");
const { sequelize }  = require("../models/db/mysql");
const { admin } = require("../models/Admin_Register");

const standard = sequelize.define("standards_available", {
    id : {
		type: DataTypes.INTEGER,
        autoIncrement: true,
		primaryKey: true,
	},
    name : {
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
    indexes: [
        {
            unique: true,
            fields: ['name', 'institute_id']
        }
    ]
});


module.exports = { standard };