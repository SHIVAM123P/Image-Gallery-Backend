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
    const images = await Image.find({}, { _id: 1, imageUrl: 1 });

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



module.exports = { uploadImage, getImages, toggleLike, getLikedImages };
