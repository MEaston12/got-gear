const User = require('./User');
const Gear = require('./Gear');
const Tag = require('./Tag');

Gear.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Gear, {
    foreignKey: 'user_id'
});

Tag.belongsToMany(Gear, {through: 'Gear_Tags'});
Gear.belongsToMany(Tag, {through: 'Gear_Tags'});

module.exports = {User, Gear, Tag};