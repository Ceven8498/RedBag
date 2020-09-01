// requirements: router, apiRoutes, and renderRoutes
const router = require('express').Router();
const apiRoutes = require('./api');
const renderRoutes = require('./render-routes');

// basically says:
// localhost:3001/renderroutegoeshere   will be for all the render routes
// localhost:3001/api/apiroutegoeshere  will be for all the api routes
router.use('/', renderRoutes);
router.use('/api', apiRoutes);

// this will display when the user hits a wrong route
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;