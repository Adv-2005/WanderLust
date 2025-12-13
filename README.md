# Wanderlust - A Travel Listing Platform

Wanderlust is a full-stack web application that allows users to browse, add, and review travel listings. It's a directory of beautiful places to stay around the world, from cozy cottages to luxurious villas.

## Features

*   **User Authentication:** Secure user registration and login using Passport.js.
*   **CRUD Operations:** Users can create, read, update, and delete their own listings.
*   **Image Uploads:** Image uploads are handled using Multer and stored on Cloudinary.
*   **Interactive Maps:** Mapbox integration to show the location of each listing.
*   **Reviews and Ratings:** Users can leave reviews and ratings for listings.
*   **Flash Messages:** Connect-flash is used for displaying flash messages to the user.

## Technologies Used

*   **Frontend:**
    *   EJS
    *   CSS
    *   JavaScript
*   **Backend:**
    *   Node.js
    *   Express
    *   MongoDB
    *   Mongoose
*   **Authentication:**
    *   Passport.js
    *   Passport Local
    *   Passport Local Mongoose
*   **Image Storage:**
    *   Cloudinary
    *   Multer
*   **Mapping:**
    *   Mapbox SDK

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/wanderlust.git
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    MAPBOX_TOKEN=<your_mapbox_token>
    MONGO_URL=<your_mongodb_connection_string>
    ```

## Usage

1.  Start the application:
    ```bash
    node app.js
    ```
2.  Open your browser and navigate to `http://localhost:3000`.
