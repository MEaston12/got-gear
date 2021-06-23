var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/', (req, res) => {
  res.render('index', { title: 'Got Gear' });
});

module.exports = router;
