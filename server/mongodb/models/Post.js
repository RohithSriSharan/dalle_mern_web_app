
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };