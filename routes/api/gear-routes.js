const router = require('express').Router();
const {Op} = require('sequelize');
const {Gear, Tag} = require('../../models');

// GET /api/gear/:user_id
router.get('/:user_id', async (req, res) => {
    //route should return a json of all the user's registered gear
    const user_id = parseInt(req.params.user_id);
    res.json(await Gear.findAll({
        where: {
            user_id: user_id
        }
    }));
});

// POST /api/gear/:user_id
router.post('/:user_id', async (req, res) => {
    // Expects a data format {user_id: 'megauser123' ,name: 'Tent', desc: 'Keeps the outside out and the inside in.', tags: [1,2,3]}
    const user_id = req.params.user_id;
    const {name, desc, tags} = req.body; //destructuring magic
    const gear = await Gear.create({
        user_id: user_id,
        name: name,
        desc: desc
    });
    res.json(await updateGear(gear, user_id, name, desc, tags));
});

// PUT /api/gear/:user_id
router.put('/:user_id', async (req, res) => {
    // If req.body has exact key/value pairs to match the model, you can just use the 'req.body' instead
    const user_id = req.params.user_id;
    const {gear_id, name, desc, tags} = req.body; //destructuring magic - tags is meant to be an array of tag ids to associate with the gear
    const gear = await Gear.findOne({where: {id:gear_id}}); //saving the piece of gear we're updating to an instance
    res.json(await updateGear(gear, user_id, name, desc, tags));
});

// DELETE /api/gear/:user_id
router.delete('/:user_id', async (req, res) => {
    const {gear_id} = req.body;
    res.json(await Gear.destroy({
        where: {
            user_id: req.params.user_id,
            id: gear_id
        }
    }));
});

async function updateGear(gear, user_id, name, desc, tags){
    const myTags = await Tag.findAll({where: {id:tags}}); //need to generate an array of tags to associate with this object
    await gear.update({
        user_id: user_id, 
        name: name,
        desc: desc
    });
    await gear.setTags(myTags);
    return gear;
}

module.exports = router;