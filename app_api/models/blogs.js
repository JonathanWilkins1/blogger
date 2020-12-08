var mongoose = require('mongoose');
require('./comment');

var blogSchema = new mongoose.Schema({
  blogTitle: String,
  blogText: String,
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  },
  comments: ['Comment']
});

mongoose.model('Blog', blogSchema);
