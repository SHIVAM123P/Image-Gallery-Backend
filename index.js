const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Image = require('./models/imageModel')
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
// Function to generate random image URLs
const generateRandomImageUrl = () => {
  const imageUrls = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9exX-jIAqoN91jcrXpiIsHkLcovEJNk-aX_NQNPIJ4w&s',
    'https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=',
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    'https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75&q=75',
    'https://media.istockphoto.com/id/505239248/photo/humayun-tomb-new-delhi-india.jpg?s=612x612&w=0&k=20&c=UQTU6YOnVsSklzHi34cOhNW5AhsACDxKLiD9--T-3Kg=',
    'https://media.istockphoto.com/id/505239248/photo/humayun-tomb-new-delhi-india.jpg?s=612x612&w=0&k=20&c=UQTU6YOnVsSklzHi34cOhNW5AhsACDxKLiD9--T-3Kg=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyBZQXks9XrdFVC6JS1ufNvNsm3NMGGKeA-RYAncx&s',
    'https://media.gettyimages.com/id/505757382/photo/jama-masjid-mosque-in-delhi.jpg?s=612x612&w=gi&k=20&c=sBvIRci9Qskao07cm154iFmyTaIKTL0pCYChXGz5s8w=',
    'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg',
    'https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg',
    'https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg',
    'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg'

  ];

  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};

// Function to insert random images
const insertRandomImages = async () => {
  try {
    const numberOfImagesToInsert = 20; // Change this value to the number of images you want to insert

    for (let i = 0; i < numberOfImagesToInsert; i++) {
      const imageUrl = generateRandomImageUrl();
      const newImage = new Image({ imageUrl });
      await newImage.save();
      console.log(`Image inserted: ${imageUrl}`);
    }

    console.log('Random images inserted successfully!');
    // Close the database connection
    // mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting random images:', error);
    // Close the database connection on error
    // mongoose.connection.close();
  }
};


insertRandomImages();

// Import the imageController
const imageController = require('./controllers/imageController');

// Route for image upload
app.post('/uploadImage', upload.single('image'), imageController.uploadImage);

// Route for fetching all images
app.get('/getImages', imageController.getImages);

app.put('/toggleLike/:id', imageController.toggleLike);

app.get('/getLikedImages', imageController.getLikedImages);
app.get('/handleAddToAlbum/:_id', imageController.handleAddToAlbum)