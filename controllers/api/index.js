const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
//const imageRoutes = require('./image-routes');



router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
//router.use('/images', imageRoutes);
module.exports = router;
