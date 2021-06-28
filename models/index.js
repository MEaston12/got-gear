const User = require('./User');
const Gear = require('./Gear');
const Tag = require('./Tag');

User.belongsToMany(Gear, {through: 'User_Gear'});
Gear.belongsToMany(User, {through: 'User_Gear'});

Tag.belongsToMany(Gear, {through: 'Gear_Tags'});
Gear.belongsToMany(Tag, {through: 'Gear_Tags'});

module.exports = {User, Gear, Tag};