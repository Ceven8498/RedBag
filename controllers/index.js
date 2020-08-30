const router = require('express').Router();
const apiRoutes = require('./api');
const renderRoutes = require('./render-routes');

router.use('/', renderRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;