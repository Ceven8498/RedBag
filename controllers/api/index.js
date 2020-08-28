const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const renderRoutes = require('../render-routes');


router.use('/', renderRoutes);
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
module.exports = router;
