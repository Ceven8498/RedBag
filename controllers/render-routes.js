
const router = require('express').Router();
const db = require("../models")
const { Router } = require("express")

router.get("/", (req, res) => {
    res.render("index")
})

router.get("/images", (req, res) => {
    db.Product.findAll({}).then(image => {
        res.render("images", {images: image})
    })
})

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }
  
    res.render('login');
  });

module.exports = router