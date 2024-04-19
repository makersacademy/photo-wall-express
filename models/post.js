const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: String,
  filePath: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
