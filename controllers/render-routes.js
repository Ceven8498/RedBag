
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

router.get("/single-products", (req, res) => {
    db.Product.findAll({}).then(product_name => {
        res.render("single-product", {products: product_name})
    })
})

module.exports = router