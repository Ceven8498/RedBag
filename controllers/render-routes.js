// requirements: sequelize, router, models (as db), withAuth for user-session authorization
const sequelize = require('../config/connection');
const router = require('express').Router();
const db = require("../models")
const { Router } = require("express");
const { precompile } = require('handlebars');
const withAuth = require('../utils/auth.js');
const { update } = require('../models/User');

// localhost:3001/
// homepage, displays login.handlebars
router.get("/", (req, res) => {
    res.render("login", { loggedIn: req.session.loggedIn})
})

// localhost:3001/images
// images page, displays images.handlebars
router.get("/images", (req, res) => {
    db.Product.findAll({}).then(image => {
        res.render("images", { images: image })
    })
})

// localhost:3001/new-product
// page to create new-product, displays index.handlebars
router.get("/new-product", (req, res) => {
    res.render("index", {loggedIn: req.session.loggedIn})
})

// get all products
// localhost:3001/products
// page to view all products, renders products.handlebars
router.get("/products", (req, res) => {
    // find all products
    db.Product.findAll({
        // attributes are essentially the columns of the table that is associated with the model, in this case it is the Product model
        attributes: [
            'id',
            'product_name',
            'description',
            'price',
            'condition',
            'location',
            'image',
            'user_id',
            // sequelize literals are basically mysql queries
            [sequelize.literal('(SELECT username FROM user WHERE product.user_id = user.id)'), 'user']
        ]

        // '.then() = > {} res.json ();' 
        // is creating an object, in this case 'products', and then passing the results of our sequelize database query into that object as json data
        // hence the  'res.json()'
    }).then(products => {
        // we're establishing this route to render products.handlebars
        // we're also passing through the sequelize data that our route gives us
        // this data is established as products, for handlebars to use in the products.handlebars page
        res.render("products", { products, loggedIn: req.session.loggedIn })
    })
})

router.get('/user/:id', (req, res) => {
    console.log("About to rate a user!\n");

    db.Product.findAll({

        where: {
            user_id: req.params.id
        },
        attributes: [
            'id',
            'product_name',
            'description',
            'price',
            'condition',
            'location',
            'image',
            'user_id',
            // sequelize literals are basically mysql queries
            [sequelize.literal('(SELECT username FROM user WHERE product.user_id = user.id)'), 'user']
        ]

    }).then(products => {
        // we're establishing this route to render products.handlebars
        // we're also passing through the sequelize data that our route gives us
        // this data is established as products, for handlebars to use in the products.handlebars page
        res.render("products", { products, loggedIn: req.session.loggedIn })
    })
})




// get one product by id
// localhost:3001/product/idgoeshere
// page to view one product, renders single-product.handlebars page
router.get("/product/:id", (req, res) => {
    db.Product.findOne({
        // 'where' is a mysql-derived query that establishes parameters for the data we specifically want from the table
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'user_id',
            'product_name',
            'description',
            'price',
            'condition',
            'location',
            'image',
            [sequelize.literal('(SELECT username FROM user WHERE product.user_id = user.id)'), 'user'],
            [sequelize.literal('(SELECT email FROM user WHERE product.user_id = user.id)'), 'email']

        ]


    }).then(product => {
        // taking product data and converting it to plain json
        // then we call this variable prod, so now we're passing prod into handlebars
        // instead of products
        const prod = product.get({ plain: true });
        console.log("product is: ", prod);
        res.render("single-product", { prod, loggedIn: req.session.loggedIn })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// get one sellers page by id
// localhost:3001/seller/idgoeshere
router.get("/seller/:id", (req, res) => {
    db.Rating.findOne({
        where: {
            user_id: req.params.id
        },
        attributes: [
            'rated_by',
            'rating_value',
            //'user_id',
            [sequelize.literal('(SELECT username FROM user WHERE rating.user_id = user.id)'), 'user']
            //[sequelize.literal('(SELECT AVG(rating_value) FROM rating WHERE rating.rated_by = user.id)'), 'rating_avg']
        ]
    })
        .then(ratings => {
            res.render("rating", { ratings, loggedIn: req.session.loggedIn })
        })
})

// i think this is being replaced now by our seller route
// this route is very similar to the above route but
// for testing purposes i think its commented out for now
// just use above route for now


router.get('/rating/:id', (req, res) => {
    console.log("About to rate a user!\n");

    if (req.session) {
        console.log("About to rate a user!....again\n");
        console.log("our rater is: ", req.session.user_id);
        console.log("our user being rated is: ", req.params.id);
        console.log("our selected rating value is: ", req.body.rating_value);
        db.Rating.findAll(
            {
                where: {
                    user_id: req.params.id
                },
                attributes: [
                    'rated_by',
                    'user_id',
                
                    'rating_value',
                    'rating_comment',
                    [sequelize.literal('(SELECT username FROM user WHERE rating.rated_by = user.id)'), 'rater'],
                    [sequelize.literal("(SELECT username FROM user WHERE id = " + req.params.id + ")"), 'rated']
                ]
            }
            ,
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
                db.User.findOne({
                    attributes: {
                      exclude: ['password'],
                    },
                    // 'where' is a mysql-derived query that establishes parameters for the data we specifically want from the table
                    where: {
                      id: req.params.id
                    },
                  })
                  .then(user => {
                      console.log("Our user is: ", user);
                      console.log("our updated Rating data is: ", updatedRatingData);
                    res.render("rating", { rating: updatedRatingData, user: user, loggedIn: req.session.loggedIn})
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
})

router.get("/products/:category", (req, res) => {
    // find all products
    console.log("req.params.category is: ", req.params.category)
    db.Category.findOne({

        where: {
            category_name: req.params.category
        },
        // 'include' tells us what data to provide us after we find all categories in our database

        // '.then() = > {} res.json ();' 
        // is creating an object, in this case 'dbCategory', and then passing the results of our sequelize database query into that object as json data
        // hence the  'res.json()'
    }).then(categories => {
        const id = categories.get({ plain: true });
        console.log("Our id is: ", id.id);
        db.Product.findAll({
            // attributes are essentially the columns of the table that is associated with the model, in this case it is the Product model
            where: {
                category_id: id.id
            },
            attributes: [
                'id',
                'product_name',
                'description',
                'price',
                'condition',
                'location',
                'image',
                'user_id',
                // sequelize literals are basically mysql queries
                [sequelize.literal('(SELECT username FROM user WHERE product.user_id = user.id)'), 'user']
            ]

            // '.then() = > {} res.json ();' 
            // is creating an object, in this case 'products', and then passing the results of our sequelize database query into that object as json data
            // hence the  'res.json()'
        }).then(products => {
            // we're establishing this route to render products.handlebars
            // we're also passing through the sequelize data that our route gives us
            // this data is established as products, for handlebars to use in the products.handlebars page
            res.render("products", { products, loggedIn: req.session.loggedIn })
        })

    })
})

// this is our homepage route, which will render login.handlebars
// this route is the same handlebar page as localhost:3001/
// localhost:3001/login
router.get('/login', (req, res) => {
    //   if (req.session.loggedIn) {
    //  res.redirect('/');
    //return;
    // }

    res.render('login');
});

module.exports = router