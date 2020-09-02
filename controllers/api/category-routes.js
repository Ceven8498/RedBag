// requirements: router, models, withAuth for user-session authorization
const router = require('express').Router();
const { Category, Product } = require('../../models');
const withAuth = require('../../utils/auth.js');

// The '/api/categories' routes (see index.js in the api folder)
// These routes are either get , post, put, or delete
// The purpose of these routes is to retrieve (get), create (post), update (put), or delete (delete) data contained in our database
// The data it is using is derived from our database, through object-relational mapping, or ORM (see models folder)

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // 'include' tells us what data to provide us after we find all categories in our database
    include: [
      {
        // in this case, we will also include the Products that are associated with each category
        model: Product,
        // attributes are essentially the columns of the table that is associated with the model, in this case it is the Product model
        attributes: ['id', 'product_name', 'description', 'price', 'condition', 'location', 'category_id', 'user_id']
      },
    ]
    // '.then() = > {} res.json ();' 
    // is creating an object, in this case 'dbCategory', and then passing the results of our sequelize database query into that object as json data
    // hence the  'res.json()'
  }).then(dbCategory => {
    res.json(dbCategory);
  });
});

// this get route is essentially doing the same thing as the previous get route
// but in this scenario we are only finding one category by its associated id
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    // 'where' is a mysql-derived query that establishes parameters for the data we specifically want from the table
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


// post routes are used for creating new objects based off of our models
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    // because our category model only has two columns (id & category_name) we only need to provide the category name in json format
    // if you want to create a category in insomnia, your json data has to contain these fields
    category_name: req.body.category_name
  })
    .then(dbCategory => res.json(dbCategory))
    // gives user an error if the post was unsuccessful
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// put routes are used for updating objects that already exist in our database
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    // tells us what we are updating
    {
      category_name: req.body.category_name
    },
    // tells us 'where' we should update, or which category id we should update
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


// delete routes are used to delete objects from our databases
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
