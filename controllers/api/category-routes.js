const router = require('express').Router();
const { Category, Product } = require('../../models');
const withAuth = require('../../utils/auth.js');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'description', 'price', 'condition', 'location', 'category_id', 'user_id']
      },
    ]
  }).then(dbCategory => {
    res.json(dbCategory);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'description', 'price', 'condition', 'location', 'category_id', 'user_id']
      },
    ]
  }).then(dbCategory => {
    res.json(dbCategory);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
    where: {
      id: req.params.id
    }
    }
  )
    .then(dbCategory => {
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategory => {
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
