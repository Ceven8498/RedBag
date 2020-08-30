const router = require('express').Router();
const { User, Product, Category, Rating } = require('../../models');
const sequelize = require('../../config/connection.js');

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { 
      exclude: ['password'],
      include: [[sequelize.literal("(SELECT AVG(rating_value) FROM rating WHERE rating.user_id = user.id)"),
         'rating_avg']]
   }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { 
      exclude: ['password'], 
      include: [[sequelize.literal('(SELECT AVG(rating_value) FROM rating WHERE rating.user_id = user.id)'),
         'rating_avg']] 
    },
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

router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
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



router.put('/:id', (req, res) => {
  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
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

router.put('/rating/:id', (req, res) => {
  console.log("About to rate a user!\n");

  if(req.session){
    console.log("About to rate a user!....again\n");
    console.log("our rater is: ",req.session.user_id);
    console.log("our user being rated is: ", req.params.id);
    console.log("our selected rating value is: ", req.body.rating_value);
    Rating.create(
       {
          rated_by: req.session.user_id,
          user_id: req.params.id,
          rating_value: req.body.rating_value
        }
    )
    .then(updatedRatingData => {
      if (!updatedRatingData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(updatedRatingData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err); 
    });
  }
});

router.delete('/:id', (req, res) => {
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
