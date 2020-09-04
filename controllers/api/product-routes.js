// requirements:
// router, models, withAuth for user-session authorization
// multer, google cloud storage, uuid, dotenv
const router = require('express').Router();
const { Product, Category, User } = require('../../models');
const withAuth = require('../../utils/auth.js');
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const uuid = require("uuid");
const uuidv1 = uuid.v1;
require("dotenv").config()


// establishes storage as google cloud
// using multer to store image files
const storage = new Storage({ projectId: process.env.GCLOUD_PROJECT, credentials: { client_email: process.env.GCLOUD_CLIENT_EMAIL, private_key: process.env.GCLOUD_PRIVATE_KEY } });
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const bucket = storage.bucket(process.env.GCS_BUCKET);

// The '/api/products' routes (see index.js in the api folder)
// These routes are either get , post, put, or delete
// The purpose of these routes is to retrieve (get), create (post), update (put), or delete (delete) data contained in our database
// The data it is using is derived from our database, through object-relational mapping, or ORM (see models folder)

// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
    // 'include' tells us what data to provide us after we find all products in our database
    include: [
      {
        // in this case, we will also include the Categories that are associated with each product
        model: Category,
        // attributes are essentially the columns of the table that is associated with the model, in this case it is the Category model
        attributes: ['id', 'category_name']
      },
      {
        // in this case, we will also include the User that is associated with each product
        model: User,
        attributes: ['id', 'username']
      },
    ]
    // '.then() = > {} res.json ();' 
    // is creating an object, in this case 'dbProduct', and then passing the results of our sequelize database query into that object as json data
    // hence the  'res.json()'
  }).then(dbProduct => {
    res.json(dbProduct);
  });
});

// get one product
// this get route is essentially doing the same thing as the previous get route
// but in this scenario we are only finding one product by its associated id
router.get('/:id', (req, res) => {
  Product.findOne({
    // 'where' is a mysql-derived query that establishes parameters for the data we specifically want from the table
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: User,
        attributes: ['id', 'username']
      },
    ]
  }).then(dbProduct => {
    res.json(dbProduct);
  });
});



//post image
router.post("/", /*withAuth,*/ multer.single("file"), (req, res) => {
  const newFileName = uuidv1() + "-" + req.file.originalname
  const blob = bucket.file(newFileName)
  const blobStream = blob.createWriteStream()

  blobStream.on("error", err => console.log(err))

  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`

    const imageDetails = JSON.parse(req.body.data)
    imageDetails.image = publicUrl
    console.log("Image details are: ", imageDetails);
    //console.log("body data is: ", req.body);
    Product.create({
      // product_name: 'Sample Product',
      // description: 'Our wonderfully amazing sample product',
      // price: 99.99,
      // condition: 'Magnificent',
      // location: 'Austin',
      // user_id: 1,
      product_name: imageDetails.product_name,
      description: imageDetails.description,
      price: imageDetails.price,
      condition: imageDetails.condition,
      location: imageDetails.location,
      category_id: imageDetails.category_id,
      user_id: req.session.user_id,
      image: publicUrl,
      image_name: imageDetails.image_name
    }).then(dbProduct => res.json(dbProduct))
      .catch(err => {
        console.log(err);
        res.status(505).json(err);
      });
  });

  blobStream.end(req.file.buffer)
})

// post routes are used for creating new objects based off of our models
// create new product
router.post('/', (req, res) => {
  Product.create({
    // because our product model only has these columns (product_name, description, etc.) we provide these fields in json format
    // if you want to create a product in insomnia, your json data has to contain these fields
    product_name: req.body.product_name,
    description: req.body.description,
    price: req.body.price,
    condition: req.body.condition,
    location: req.body.location,
    category_id: req.body.category_id,
    user_id: req.session.user_id
  })
    .then(dbProduct => res.json(dbProduct))
    .catch(err => {
      // gives user an error if the post was unsuccessful
      console.log(err);
      res.status(500).json(err);
    });
});

// update product
// put routes are used for updating objects that already exist in our database
router.put('/:id', (req, res) => {
  // update a product by its `id` value
  Product.update(req.body, {
    // tells us 'where' we should update, or which category id we should update
    where: {
      id: req.params.id
    }
  })
    .then(dbProduct => {
      res.json(dbProduct);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete routes are used to delete objects from our databases
router.delete('/:id', (req, res) => {
  // delete product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbProduct => {
      if (!dbProduct[0]) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProduct);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
