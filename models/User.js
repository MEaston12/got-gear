const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Create our User model
class User extends Model {
    // setup method to reun on instance data (per user) to check password
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Define table columns and configs
User.init(
    {
        // Table column definitions go here

        // Define an id column
        id: {
            // Use the special Sequelize DataTypes object provide what type of data
            type: DataTypes.INTEGER,
            // This is the equivalent of SQL's 'NOT NULL'
            allowNull: false,
            // Instruct that this is the Primary Key
            primaryKey: true,
            // Turn on auto increment
            autoIncrement: true
        },
        // Define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // There cannot be any duplicate email values
            unique: true,
            // If allowNull is set to false, we can run our data through a validator
            validate: {
                isEmail: true
            }
        },
        // Define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // Sets password length to at least four characters
                len: [4]
            }
        },
    },
    {
        // Table config goes here

        hooks: {
            // Set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
              },
            // Set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
            },
        

        // Pass in imported sequelize connection
        sequelize,
        // Don't automatically create created at/updated at timestamps
        timestamps: false,
        // Don't pluralize name of database table
        freezeTableName: true,
        // User underscores instead of camel casing
        underscored: true,
        // Make it so our model name stays lowercase in db
        modelname: 'user'
    }
);

module.exports = User;