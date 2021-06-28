const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes')


router.use('/api', apiRoutes);

/* GET home page. */
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;