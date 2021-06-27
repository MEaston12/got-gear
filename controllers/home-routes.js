const router = require('express').Router();
const sequelize = require('sequelize');
const { User, Tag, Gear } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', { title: 'Got Gear' });
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/gearbag');
      return;
    }
    res.render('user-login', { title: 'Login' });
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/gearbag');
      return;
    }
    res.render('signup', { title: 'signup' });
  });
  
  router.get('/gearbag', (req, res) => {
    // console.log(req.session);

    // const user = User.findOne({
    //   attributes: { exclude: ['password'] },
    //   where: {
    //     id: req.params.id
    //   }
    // })
    User.findAll({
    //   attributes: [
    //     'name',
    //     'desc'
    //   ],
    //   where: {
    //       id: req.params.id
    //   },
    //   include: [
    //     {model: User,
    //     attributes: ['username']
    //     }
    //   ]
    })
    .then(dbGearData => {
      // const gear = dbGearData.map(gear => gear.get({ plain: true }));
      // render details based on session
      res.render('gear', { 
          title: 'Gear Bag',
          Username: req.session.username,
          // gear,
          loggedIn: req.session.loggedIn,
     });
    })
    .catch(err => {res.status(500).json(err)});
  });



  module.exports = router;