const router = require('express').Router();
const { Gear, Tag } = require('../../models');

// GET /api/gear/
router.get('/', async (req, res) => {
    //route should return a json of all known gear
    res.json(await Gear.findAll({}));
});

// GET /api/gear/:gear_id
router.get('/:gear_id', async (req, res) => {
    //route should return a json of all known gear
    const gear_id = req.params.gear_id;
    res.json(await Gear.findOne({where:{id:gear_id}}));
});

// POST /api/gear/
router.post('/', async (req, res) => {
    // Expects a data format {name: 'Tent', desc: 'Keeps the outside out and the inside in.', tags: [1,2,3]}
    const {name, desc, tags} = req.body; //destructuring magic
    const gear = await Gear.create({
        name: name,
        desc: desc
    });
    res.json(await updateGear(gear, name, desc, tags));
});

// PUT /api/gear/:gear_id
router.put('/:gear_id', async (req, res) => {
    // Expects a data format {name: 'Tent', desc: 'Keeps the outside out and the inside in.', tags: [1,2,3]}
    //   If any of these elements are missing in the body, they are not modified.
    const gear_id = req.params.gear_id;
    const {name, desc, tags} = req.body; //destructuring magic - tags is meant to be an array of tag ids to associate with the gear
    const gear = await Gear.findOne({where: {id:gear_id}}); //saving the piece of gear we're updating to an instance
    res.json(await updateGear(gear, name, desc, tags));
});

// DELETE /api/gear/:gear_id
router.delete('/:gear_id', async (req, res) => {
    const {gear_id} = req.params.gear_id;
    res.json(await Gear.destroy({where: {id: gear_id}}));
});

async function updateGear(gear, name, desc, tags){
    //This function should update any attribute that comes in through the parameters and not overwrite anything else.
    const update = {};
    if(name) update.name = name;
    if(desc) update.desc = desc;
    if(Object.keys(update).length) await gear.update(update);
    if(tags){
        const gearTags = await Tag.findAll({where: {id:tags}}); //need to generate an array of tags to associate with this object
        await gear.setTags(gearTags);
    }
    return gear;
}

module.exports = router;