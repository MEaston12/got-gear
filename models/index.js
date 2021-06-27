const User = require('./User');
const Gear = require('./Gear');

Gear.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Gear, {
    foreignKey: 'user_id'
});

module.exports = {User, Gear};