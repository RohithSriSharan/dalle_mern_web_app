# dalle_mern_web_app
# folio
MERN DALL-E Image Generation App
The MERN DALL-E Image Generation App is a full-stack web application that generates custom images based on user input. The app uses the DALL-E neural network to generate high-quality images, and the MERN stack (MongoDB, Express, React, and Node.js) for the front-end and back-end.
Installation
-Prerequisites
  Before installing the app, ensure you have the following installed on your system:
    -Node.js and npm (Node Package Manager)
     -MongoDB
To install the app, follow these steps:

Clone the repository to your local machine.
Install the dependencies for both the front-end and back-end using the following commands:

  cd client
  npm install
  cd ..(or opent a different terminal)
  cd server
  npm install
Start the client using the following command:
cd client
npm start
Start the server using the following command:
cd server
nodemon index.js 

Navigate to http://localhost:3000/ in your browser to view the app.

Usage
To use the app, follow these steps:

Enter a text prompt in the input field on the app's front-end.
Click the "Generate Image" button.
Wait for the image to generate.
Save the image to your device or share it on social media.
Folder Structure
The app's folder structure is as follows:

client: React client front-end
public: Static files (e.g. HTML, images)
src: React components, styling, and API requests
server: Node.js back-end
config: Configuration files
models: Mongoose models
routes: API routes
utils: Helper functions
app.js: Express app configuration
Dependencies
The app uses the following dependencies:

Front-end
React: a JavaScript library for building user interfaces.
Axios: a library for making HTTP requests.
Styled Components: a library for styling React components.
Back-end
Express: a web framework for Node.js.
Mongoose: an Object-Document Mapping (ODM) library for MongoDB.
DALL-E API: an API that provides access to the DALL-E neural network.
