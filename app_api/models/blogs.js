var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
  blogTitle: String,
  blogText: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

mongoose.model('Blog', blogSchema);
