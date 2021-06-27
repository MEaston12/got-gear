const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');


router.use('/login', (req, res) => {
  res.render('user-login', { title: 'Login' });
});

router.use('/gearbag', (req, res) => {
  res.render('gear', { title: 'Gear Bag' })
});

router.use('/api', apiRoutes);

/* GET home page. */
router.use('/', (req, res) => {
  res.render('index', { title: 'Got Gear' });
});

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;