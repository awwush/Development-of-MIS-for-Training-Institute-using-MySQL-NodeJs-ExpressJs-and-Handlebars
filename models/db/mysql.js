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

// const sequelize = new Sequelize('mis', 'CRUD', 'CRUD', {
//     host: 'mis.c7zw0gnocfta.ap-south-1.rds.amazonaws.com', // the database is deleted as of 9 May 2022
//     dialect: 'mysql',
//     port: 3306,
//     logging: false,
// define: {
//     freezeTableName: true,
// }
// });

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