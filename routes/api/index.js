const { resourceLimits } = require('worker_threads');
const router = require('express').Router();
const userRoutes = require('./user-routes');
const gearRoutes = require('./gear-routes');
const tagRoutes = require('./tag-routes');

router.use('/users', userRoutes);
router.use('/gear', gearRoutes);
router.use('/tag', tagRoutes);

module.exports = router;