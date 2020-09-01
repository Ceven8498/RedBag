// requirements: router, models, withAuth for user-session authorization
const router = require('express').Router();
const { User, Product, Category, Rating } = require('../../models');
const sequelize = require('../../config/connection.js');
const withAuth = require('../../utils/auth.js');

// get all users
// The '/api/users' routes (see index.js in the api folder)
// These routes are either get , post, put, or delete
// The purpose of these routes is to retrieve (get), create (post), update (put), or delete (delete) data contained in our database
// The data it is using is derived from our database, through object-relational mapping, or ORM (see models folder)

router.get('/', (req, res) => {
  // find all users
  User.findAll({
    // attributes are essentially the columns of the table that is associated with the model, in this case it is the User model
    attributes: {
      // will not present us the password for confidentiality reasons
      exclude: ['password'],
      // 'include' tells us what data to provide us after we find all Users in our database
      include: [[sequelize.literal("(SELECT AVG(rating_value) FROM rating WHERE rating.user_id = user.id)"),
        'rating_avg']]
    }
  })
    // '.then() = > {} res.json ();' 
    // is creating an object, in this case 'dbUserData', and then passing the results of our sequelize database query into that object as json data
    // hence the  'res.json()'
    .then(dbUserData => res.json(dbUserData))
    // gives user an error if the post was unsuccessful
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this get route is essentially doing the same thing as the previous get route
// but in this scenario we are only finding one User by its associated id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: {
      exclude: ['password'],
      include: [[sequelize.literal('(SELECT AVG(rating_value) FROM rating WHERE rating.user_id = user.id)'),
        'rating_avg']]
    },
    // 'where' is a mysql-derived query that establishes parameters for the data we specifically want from the table
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id',
          'product_name',
          'description',
          'price',
          'condition',
          'location',
          'category_id'
        ]
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post routes are used for creating new objects based off of our models
router.post('/', (req, res) => {
  // expects {username: 'usernamegoeshere', email: 'email@website.com', password: 'passwordgoeshere'}
  // because our User model table contains these columns (username, email, password) we provide the fields in json format
  // if you want to create a User in insomnia, your json data has to contain these fields
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      // saves your session as the last user created
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// put routes are used for updating objects that already exist in our database
router.put('/:id', (req, res) => {
  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    // tells us 'where' we should update, or which category id we should update
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.put('/rating/', (req, res) => {
//   console.log("About to rate a user!\n");

//   //if(req.session){
//     console.log("About to rate a user!....again\n");
//     console.log("our rater is: ",req.body.rated_by);
//     console.log("our user being rated is: ", req.body.user_id);
//     console.log("our selected rating value is: ", req.body.rating_value);
//     Rating.create(
//        {
//           rated_by: req.body.rated_by,
//           user_id: req.body.user_id,
//           rating_value: req.body.rating_value
//         }
//     )
//     .then(updatedRatingData => {
//       if (!updatedRatingData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(updatedRatingData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err); 
//     });
//  // }
// });


// delete routes are used to delete objects from our databases
router.delete('/:id', (req, res) => {
  // delete a User by its `id` value
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
