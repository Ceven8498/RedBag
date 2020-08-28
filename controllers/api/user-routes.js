const router = require('express').Router();
const { User, Product, Category, Rating } = require('../../models');
const sequelize = require('../../config/connection.js');

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
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
      // {
      //   model: Rating,
      //   attributes: [
      //     [sequelize.literal('(SELECT AVG(rating_value) FROM rating WHERE rating.user_id = user.id)'),
      //     'rating_avg']
      //   ]
      // },
      {
        model: Product,
        attributes: ['id', 
        'product_name', 
        'description', 
        'price', 
        'condition', 
        'location', 
        'category_id',
        
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

router.put('/rating', (req, res) => {
  if(req.session){
    console.log("About to rate a user!\n");
    User.rate(
      { ...req.body, user_id: req.session.user_id },
      {Rating, User}
    )
    .then(updatedRatingData => res.json(updatedRatingData))
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
