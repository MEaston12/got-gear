const Sequelize = require('sequelize');

// Create connection to our databse using mysql info.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_ADDRESS || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
});

module.exports = sequelize;