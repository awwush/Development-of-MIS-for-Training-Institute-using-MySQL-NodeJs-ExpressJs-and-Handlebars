require("dotenv").config();

const { Sequelize } = require('sequelize');

/// Localhost connection

// const sequelize = new Sequelize('mis', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306,
//     logging: false,
//     define: {
//         freezeTableName: true,
//     }
// });

/// Realtime database connection

const sequelize = new Sequelize('mis', process.env.db_username, process.env.db_password, {
    host: process.env.db_url, 
    dialect: 'mysql',
    port: 3306,
    logging: false,
    define: {
    freezeTableName: true,
    }
});

async function authenticateConnection() {
    try {
        await sequelize.authenticate().then(
            /// promise accept    
            () => {
                console.log("Connected to the mysql database authentication successful");
            },

            /// promise reject
            () => {
                console.log("Not connected to the mysql database authentication unsuccessful");
            })
            .catch(() => console.log("Problem authentication mysql database"));

    } catch (error) {
        console.log("Unable to connect to mysql database: ", error);
    }
}

module.exports = { authenticateConnection, sequelize };