// requirements: router, models, withAuth for user-session authorization
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// The '/api/comments' routes (see index.js in the api folder)
// These routes are either get , post, put, or delete
// The purpose of these routes is to retrieve (get), create (post), update (put), or delete (delete) data contained in our database
// The data it is using is derived from our database, through object-relational mapping, or ORM (see models folder)

router.get('/', (req, res) => {
    // find all comments
  Comment.findAll()
    // '.then() = > {} res.json ();' 
    // is creating an object, in this case 'dbCommentData', and then passing the results of our sequelize database query into that object as json data
    // hence the  'res.json()'
    .then(dbCommentData => res.json(dbCommentData))
    // gives user an error if the post was unsuccessful
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// post routes are used for creating new objects based off of our models
router.post('/', (req, res) => {
    // create a new comment
  Comment.create({
    // because our comment model contains these fields (comment_text, user_id, rating_id) we provide this in json format
    // if you want to create a comment in insomnia, your json data has to contain these fields
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    rating_id: req.body.rating_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete routes are used to delete objects from our databases
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        // if we try to delete a non-existant comment, we get this message
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
