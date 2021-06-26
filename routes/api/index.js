const { resourceLimits } = require('worker_threads');
const router = require('express').Router();
const userRoutes = require('./user-routes');
const gearRoutes = require('./gear-routes');

router.use('/users', userRoutes);
router.use('/gear', gearRoutes);

module.exports = router;