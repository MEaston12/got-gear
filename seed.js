require('dotenv').config();
const fs = require('fs').promises;
const csv = require('neat-csv');
const sequelize = require('./config/connection');
const { Gear, Tag, User } = require('./models');

const readCsv = async (path) => await csv(await fs.readFile(path));

// turn on connection to db and server
sequelize.sync({ force: true }).then(async () => {
    const gearTable = await readCsv('./db/gear.csv');
    const tagsTable = await readCsv('./db/tags.csv');
    const userTable = await readCsv('./db/users.csv');

    const tagMap = {};
    const gearMap = {};
    
    for(let row of tagsTable){
        const tag = await Tag.create({
            name: row._tagName,
            desc: row._tagDesc
        });
        tagMap[row._tagId] = tag.getDataValue('id');
    }

    for(let row of gearTable){
        const gear = await Gear.create({
            name: row._gearName,
            desc: row._gearDesc
        });
        gearMap[row._gearId] = gear.getDataValue('id');
        const tags = JSON.parse(row._gearTags).map(csvTag => tagMap[csvTag]);
        const gearTags = await Tag.findAll({where: {id:tags}});
        await gear.setTags(gearTags);
    }

    for(let row of userTable){
        const user = await User.create({
            username: row._username,
            email: row._email,
            password: row._password
        });
        const gearIds = JSON.parse(row._gear).map(csvGear => gearMap[csvGear]);
        const gearBag = await Gear.findAll({where: {id:gearIds}});
        await user.setGears(gearBag);
    }
});