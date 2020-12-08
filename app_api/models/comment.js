var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  text: String,
  email: String,
  name: String
});

mongoose.model('Comment', commentSchema);
