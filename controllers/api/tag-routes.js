const router = require('express').Router();
const { Tag } = require('../../models');

// GET /api/tag/
router.get('/', async (req, res) => {
    //route should return a json of all registered tags
    res.json(await Tag.findAll({}));
});

// GET /api/tag/:tag_id
router.get('/:tag_id', async (req, res) => {
    //route should return a json representing a given individual tag
    const tag_id = parseInt(req.params.tag_id);
    res.json(await Tag.findAll({
        where: {
            tag_id: tag_id
        }
    }));
});

// POST /api/tag/
router.post('/', async (req, res) => {
    // Expects a data format {name: '', desc: ''}
    const {name, desc} = req.body; //destructuring magic
    res.json(await Tag.create({
        name: name,
        desc: desc
    }));
});

// PUT /api/tag/:tag_id
router.put('/:tag_id', async (req, res) => {
    const tag_id = req.params.tag_id;
    const {gear_id, name, desc} = req.body; //destructuring magic
    res.json(await Tag.update({
        name: name,
        desc: desc
    },{
        where: {id:tag_id}
    }));
});

// DELETE /api/gear/:tag_id
router.delete('/:tag_id', async (req, res) => {
    const {gear_id} = req.body;
    res.json(await Tag.destroy({
        where: {
            tag_id: req.params.tag_id,
            id: gear_id
        }
    }));
});

module.exports = router;