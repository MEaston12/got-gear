const router = require('express').Router();
const {Gear } = require('../../models');

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
    // Expects a data format {user_id: 'megauser123' ,name: 'Tent', desc: 'Keeps the outside out and the inside in.'}
    const user_id = req.params.user_id;
    const {name, desc} = req.body; //destructuring magic
    res.json(await Gear.create({
        user_id: user_id,
        name: name,
        desc: desc
    }));
});

// PUT /api/gear/:user_id
router.put('/:user_id', async (req, res) => {
    // If req.body has exact key/value pairs to match the model, you can just use the 'req.body' instead
    const user_id = req.params.user_id;
    const {gear_id, name, desc} = req.body; //destructuring magic
    res.json(await Gear.update({
        user_id: user_id, 
        name: name,
        desc: desc
    },{
        where: {id:gear_id}
    }));
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

module.exports = router;