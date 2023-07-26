// controllers/imageController.js

const Image = require('../models/imageModel');

// Controller to handle image upload
const uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }
  
      // Assuming you are storing the uploaded image in the 'uploads' folder
      const imageUrl = `/uploads/${req.file.filename}`;
  
      // Save the image URL in the database
      const image = new Image({ imageUrl });
      await image.save();
      console.log(image)
  
      // Send both the image URL and image ID in the response
      return res.status(201).json({ imageUrl, _id: image._id });
    } catch (error) {
      console.error('Error while uploading image:', error);
      return res.status(500).json({ error: 'Image upload failed' });
    }
  };
  

// Controller to fetch all images from the database
const getImages = async (req, res) => {
  try {
    const images = await Image.find({}, { _id: 1, imageUrl: 1, liked:1 });

    return res.json({ images });
  } catch (error) {
    console.error('Error while fetching images:', error);
    return res.status(500).json({ error: 'Failed to fetch images' });
  }
};


const getLikedImages = async (req, res) => {
    try {
      const likedImages = await Image.find({ liked: true }, { _id: 1, imageUrl: 1 });
  
      return res.json({ likedImages });
    } catch (error) {
      console.error('Error while fetching liked images:', error);
      return res.status(500).json({ error: 'Failed to fetch liked images' });
    }
  };
  


// PUT request to toggle the "liked" property
const toggleLike = async (req, res) => {
  try {
    console.log(req.params);
    const imageId = req.params.id;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    image.liked = !image.liked;
    await image.save();

    return res.json({ liked: image.liked });
  } catch (error) {
    console.error('Error toggling like:', error);
    return res.status(500).json({ error: 'Failed to toggle like' });
  }
};

// Function to handle adding an image to an album
const handleAddToAlbum = async (req, res) => {
    try {
        console.log(req.params);
        console.log("req.body", req.body);
      const imageId = req.params.id; // Assuming the image ID is passed in the request parameters
      const albumName = req.body.albumName; // Assuming the album name is passed in the request body
  
      // Find the image in the database by ID
      const image = await Image.findById(imageId);
  
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      // Check if the album name is already present in the image's album array
      if (!image.album.includes(albumName)) {
        // If the album name is not already present, add it to the array
        image.album.push(albumName);
      }
  
      // Save the updated image document in the database
      await image.save();
  
      return res.json({ success: true });
    } catch (error) {
      console.error('Error adding image to album:', error);
      return res.status(500).json({ error: 'Failed to add image to album' });
    }
  };



  

module.exports = { uploadImage, getImages, toggleLike, getLikedImages, handleAddToAlbum };
