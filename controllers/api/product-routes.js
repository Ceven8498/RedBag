const router = require('express').Router();
const { Product, Category, User } = require('../../models');


const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const uuid = require("uuid");
const uuidv1 = uuid.v1;
require("dotenv").config()

const storage = new Storage({ projectId: process.env.GCLOUD_PROJECT, credentials: { client_email: process.env.GCLOUD_CLIENT_EMAIL, private_key: process.env.GCLOUD_PRIVATE_KEY } });
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const bucket = storage.bucket(process.env.GCS_BUCKET);


// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  Product.findAll({
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

// get one product
router.get('/:id', (req, res) => {
  Product.findOne({
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
router.post("/", multer.single("file"), (req, res) => {
  const newFileName = uuidv1() + "-" + req.file.originalname
  const blob = bucket.file(newFileName)
  const blobStream = blob.createWriteStream()

  blobStream.on("error", err => console.log(err))

  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`

    const imageDetails = JSON.parse(req.body.data)
    imageDetails.image = publicUrl
    console.log("Image details are: ", imageDetails.image_name);
    //console.log("body data is: ", req.body);
    Product.create({
      product_name: 'Sample Product',
      description: 'Our wonderfully amazing sample product',
      price: 99.99,
      condition: 'Magnificent',
      location: 'Austin',
      user_id: 1,
      // product_name: req.body.product_name,
      // description: req.body.description,
      // price: req.body.price,
      // condition: req.body.condition,
      // location: req.body.location,
      image: publicUrl,
      image_name: imageDetails.image_name
    }).then( dbProduct => res.json(dbProduct))
    .catch(err => {
      console.log(err);
      res.status(505).json(err);
    });
  });

  blobStream.end(req.file.buffer)
})

// // create new product
// router.post('/', (req, res) => {
//     Product.create({
//       product_name: req.body.product_name,
//       description: req.body.description,
//       price: req.body.price,
//       condition: req.body.condition,
//       location: req.body.location
//     })
//       .then(dbProduct => res.json(dbProduct))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// update product
router.put('/:id', (req, res) => {
    // update a product by its `id` value
    Product.update(req.body, {
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
