// requirements: router & the routes within the api folder
const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const ratingRoutes = require('./rating-routes');
//const imageRoutes = require('./image-routes');



// tells the router to establish the routes that we will use in localhost:3001
// because we are in the api folder, all of these routes will be behind /api/

//  http://localhost:3001/api/ratings
router.use('/ratings', ratingRoutes);

//  http://localhost:3001/api/categories
router.use('/categories', categoryRoutes);

//  http://localhost:3001/api/products
router.use('/products', productRoutes);

//  http://localhost:3001/api/users
router.use('/users', userRoutes);

//  http://localhost:3001/api/comments
router.use('/comments', commentRoutes);


//router.use('/images', imageRoutes);


module.exports = router;
