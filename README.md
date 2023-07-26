
# Image Gallery Backend

This is the backend part of the Image Gallery application, which provides APIs for image uploading, fetching, and handling user interactions like liking images.

## Deployment

The backend of the Image Gallery is deployed on [Render](https://render.com/). You can access the deployed backend at (https://image-gallery-5wjq.onrender.com/).

## Functionality

The backend provides the following functionalities:

1. **Image Uploading:** The backend provides an API endpoint to upload images to the server. When an image is uploaded, it is stored in a suitable location on the server.

2. **Fetching Gallery Images:** The backend provides an API endpoint to fetch all uploaded images, which are then displayed in the frontend gallery.

3. **Liking an Image:** The backend provides an API endpoint to toggle the "liked" status of an image. When a user likes or unlikes an image, the backend updates the image's "liked" status in the database.

4. **Fetching Liked Images:** The backend provides an API endpoint to fetch all images that have been liked by users.

5. **Adding Image to Album:** The backend provides an API endpoint to add an image to a user's album. Users can provide the image ID in the request parameters to add the image to the album.

## Getting Started

To run the backend application locally, follow these steps:

1. Clone this repository to your local machine.

2. Install the required dependencies using the package manager of your choice (npm, yarn, etc.).

3. Set up a MongoDB database and provide the database connection URL in the backend configuration.

4. Run the backend server using the command:

```bash
npm start
```

5. The backend server should now be running on [http://localhost:8080](http://localhost:8080).

## API Documentation

The backend exposes the following API endpoints:

- **POST /uploadImage:** Uploads an image to the server.
- **GET /getImages:** Fetches all uploaded images from the server.
- **PUT /toggleLike/:id:** Toggles the "liked" status of an image with the specified ID.
- **GET /getLikedImages:** Fetches all images that have been liked by users.
- **GET /handleAddToAlbum/:_id:** Adds an image with the specified ID to a user's album.

## Contributing

If you would like to contribute to the development of the Image Gallery application, please fork the repository and create a pull request.

---
