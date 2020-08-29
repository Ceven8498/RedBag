const sequelize = require('../config/connection');
const router = require('express').Router();
const db = require("../models")
const { Router } = require("express");
const { precompile } = require('handlebars');

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/images", (req, res) => {
    db.Product.findAll({}).then(image => {
        res.render("images", {images: image})
    })
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

module.exports = router