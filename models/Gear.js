const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Gear extends Model {}

// Define table columns and configs
Gear.init(
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
        desc: {
            type: DataTypes.STRING(2047),
            allowNull: false
        },
        tags: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tag',
                key: 'id'
            }
        }
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
        modelname: 'gear'
    }
);

module.exports = Gear;