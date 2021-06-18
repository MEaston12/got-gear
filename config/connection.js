const Sequelize = require('sequelize');
require('dotenv').config();

// Create connection to our databse using mysql info.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;