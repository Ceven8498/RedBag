// requirements: router, models, sequelize (isn't called yet)
const router = require('express').Router();
const { User, Product, Category, Rating } = require('../../models');
const sequelize = require('../../config/connection.js');

// The '/api/ratings' routes (see index.js in the api folder)
// These routes are either get , post, put, or delete
// The purpose of these routes is to retrieve (get), create (post), update (put), or delete (delete) data contained in our database
// The data it is using is derived from our database, through object-relational mapping, or ORM (see models folder)

router.get('/', (req, res) => {
  // find all ratings
  Rating.findAll({
    // '.then() = > {} res.json ();' 
    // is creating an object, in this case 'dbRating', and then passing the results of our sequelize database query into that object as json data
    // hence the  'res.json()'
  }).then(dbRating => {
    res.json(dbRating);
  });
});

// post routes are used for creating new objects based off of our models
router.post('/', (req, res) => {
  console.log("req.body is: ", req.body);
  // const ratingData = JSON.parse(req.body.data);
  // console.log("Our rating data is: ", ratingData);
  Rating.create({
    // because our Rating table has these columns (rated_by, user_id, etc..) we provide these fields in json format
    // if you want to create a rating in insomnia, your json data has to contain these fields
    rated_by: req.body.rated_by,
    user_id: req.body.user_id,
    rating_value: req.body.rating_value,
    rating_comment: req.body.rating_comment

  }).then(dbRating => {
    res.json(dbRating);
  });
});


module.exports = router;