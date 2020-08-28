const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const renderRoutes = require('../render-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/', renderRoutes);

module.exports = router;
