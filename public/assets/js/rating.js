

const router = require('express').Router();
const { User, Product, Category, Rating } = require('../../models');
const sequelize = require('../../config/connection.js');


const form = $("#comment-form")

    form.on("submit", function (event) {
        event.preventDefault()
        
        const commentText = $("#comment").val().trim()
        console.log(commentText);

        //console.log(file)

        let ratingData = {
            rated_by: 2,
            user_id: 1,
            rating_value: 5,
            rating_comment: commentText
        }
        console.log(ratingData);
        $.ajax({
            type: "post",
            url: "/api/ratings",
            data: ratingData,
            contentType: false,
            processData: false
        }).then(result => {
            console.log(result)
            return false
        })


    })


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