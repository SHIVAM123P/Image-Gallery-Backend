// models/imageModel.js

const mongoose = require('mongoose');

// Define the schema for the "images" collection
const imageSchema = new mongoose.Schema({
  // Image properties
  imageUrl: {
    type: String,
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  album: {
    type: [String], // Array of strings representing the album names
    default: [], // By default, the image is not added to any album
  },
  // Timestamps to track creation and update times
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the "images" model using the schema
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
