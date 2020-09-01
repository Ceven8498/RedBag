const router = require('express').Router();
const { User, Product, Category, Rating } = require('../../models');
const sequelize = require('../../config/connection.js');

router.get('/', (req, res) => {
    // find all products
    Rating.findAll({
    }).then(dbProduct => {
      res.json(dbProduct);
    });
  });

  router.post('/', (req, res) => {
    // find all products
    Rating.create({

        rated_by: req.body.rated_by,
        user_id: req.body.user_id,
        rating_value: req.body.rating_value,
        rating_comment: req.body.rating_comment

    }).then(dbProduct => {
      res.json(dbProduct);
    });
  });
  

module.exports = router;