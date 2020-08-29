const router = require('express').Router();
const { Product, Category, User, Image } = require('../../models');


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
  
        Image.create(imageDetails).then(() => {
            console.log("here are my image details: ", imageDetails);
            res.json(imageDetails)
        })
    })
  
    blobStream.end(req.file.buffer)
});


module.exports = router;