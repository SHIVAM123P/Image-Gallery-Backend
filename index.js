const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

const mongoString = process.env.DATABASE_URL;
const serverPort = process.env.PORT || 8080;

mongoose
  .connect(mongoString)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(serverPort, () => {
      console.log(`Server started at port ${serverPort}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Set up CORS middleware
app.use(cors());

// Set up bodyParser middleware
app.use(bodyParser.json());

// Set up static files directory (for serving uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Import the imageController
const imageController = require('./controllers/imageController');

// Route for image upload
app.post('/uploadImage', upload.single('image'), imageController.uploadImage);

// Route for fetching all images
app.get('/getImages', imageController.getImages);

app.put('/toggleLike/:id', imageController.toggleLike);

app.get('/getLikedImages', imageController.getLikedImages);
