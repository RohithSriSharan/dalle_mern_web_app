const mongoose = require ('mongoose');

// Changed the export statement to export the connectDB function as the default export
const connectDB = (url) => {
    // Set the strictQuery option to true
    mongoose.set('strictQuery', true);

    // Connect to the MongoDB database at the specified URL
    mongoose.connect(url)
        .then(() => console.log('connected to mongo'))
        .catch((err) => {
            console.error('failed to connect with mongo');
            console.error(err);
        });
};

// Export the connectDB function as the default export
module.exports = connectDB

