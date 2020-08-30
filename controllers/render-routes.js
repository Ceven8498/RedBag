const sequelize = require('../config/connection');
const router = require('express').Router();
const db = require("../models")
const { Router } = require("express");
const { precompile } = require('handlebars');

router.get("/", (req, res) => {
    res.render("login")
})

router.get("/images", (req, res) => {
    db.Product.findAll({}).then(image => {
        res.render("images", {images: image})
    })
})

router.get("/new-product", (req, res) => {
    res.render("index")
})

router.get("/single-products", (req, res) => {
    db.Product.findAll({
        attributes: [
            'product_name',
            'description',
            'price',
            'condition',
            'location',
            'image',
            [sequelize.literal('(SELECT username FROM user WHERE product.user_id = user.id)'), 'user']
        ]
          
        
    }).then(products => {
        res.render("single-product", {products})
    })
})

router.get("/seller-ratings", (req, res)=>{
    db.Rating.findAll({
        attributes: [
            'rated_by',
            'rating_value',
            'user_id',
            [sequelize.literal('(SELECT username FROM user WHERE product.user_id = user.id)'), 'user']
           // [sequelize.literal('(SELECT AVG(rating_value) FROM rating WHERE rating.rated_by = user.id)'), 'rating_avg']
        ]
    })
    .then(ratings => {
        res.render("seller-ratings", {ratings})
    })
})
router.get('/login', (req, res) => {
 //   if (req.session.loggedIn) {
  //  res.redirect('/');
    //return;
   // }
  
    res.render('login');
  });

module.exports = router