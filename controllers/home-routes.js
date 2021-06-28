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
  
  router.get('/gearbag', async (req, res) => {
    try {
      console.log(req.session.user_id);
      const gear = await Gear.findAll({
        where: {
          user_id: req.session.user_id
        },
        attributes: [
          'name',
          'desc',
        ],
      })

        res.render('gear', { 
            title: 'Gear Bag',
            Username: req.session.username,
            Gearbag: gear, 
            loggedIn: req.session.loggedIn,
       });
    }
    catch (err){
      console.log(err);
      res.status(500).json(err);
    }
  });



  module.exports = router;