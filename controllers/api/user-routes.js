const router = require('express').Router();
const { User, Gear } = require('../../models');

router.get('/:id/gearbag', async (req, res) => {
    try {
        const gearBag = await Gear.findAll({
            include: {
                model: User,
                where: {id: req.params.id},
                attributes: [],
                
            },
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt'
                ]
            }
        });
        res.json(gearBag);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id/gearbag', async (req, res) => {
    try {
        // Expecting a body with {gear: [1, 2, 3]}, should contain all the gear_ids associated with user
        const {gear} = req.body;
        const user = await User.findOne({
            attributes: {exclude: ['password']},
            where: {id: req.params.id}
        });
        const gearBag = await Gear.findAll({where: {id:gear}}); //need to generate an array of tags to associate with this object
        await user.setGears(gearBag);
        res.json(gearBag);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET /api/users
router.get('/', (req,res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    // Expects a data format {username: 'Username', email: 'User Email', password: 'user password'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// User login route
router.post('/login', (req, res) => {
    // Expects {email: 'user email', password: 'user password'}
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(400).json({ message: 'No user with that email address' });
            return;
        }
        // Verify User
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

            // create session
    req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    })
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // Expects user data in the previously mentioned format

    // If req.body has exact key/value pairs to match the model, you can just use the 'req.body' instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]){
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;