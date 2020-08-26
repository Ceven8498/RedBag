const router = require('express').Router();
const { Product, Category, User } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: User,
        attributes: ['id', 'username']
      },
    ]
  }).then(dbProduct => {
    res.json(dbProduct);
  });
});

// get one product
router.get('/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: User,
        attributes: ['id', 'username']
      },
    ]
  }).then(dbProduct => {
    res.json(dbProduct);
  });
});

// create new product
router.post('/', (req, res) => {
    Product.create({
      product_name: req.body.product_name,
      description: req.body.description,
      price: req.body.price,
      condition: req.body.condition,
      location: req.body.location
    })
      .then(dbProduct => res.json(dbProduct))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// update product
router.put('/:id', (req, res) => {
    // update a product by its `id` value
    Product.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(dbProduct => {
        res.json(dbProduct);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', (req, res) => {
    // delete product by its `id` value
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbProduct => {
        if (!dbProduct[0]) {
          res.status(404).json({ message: 'No product found with this id' });
          return;
        }
        res.json(dbProduct);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
