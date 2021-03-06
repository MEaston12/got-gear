const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Tag extends Model {}

// Define table columns and configs
Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        // desc: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
    },
    {
        // Table config goes here
        // Pass in imported sequelize connection
        sequelize,
        // Don't pluralize name of database table
        freezeTableName: true,
        // User underscores instead of camel casing
        underscored: true,
        // Make it so our model name stays lowercase in db
        modelname: 'tag'
    }
);

module.exports = Tag;