var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.get = function (req, res) {
  Blog
    .find()
    .exec(function (err, results) {
      if (!results) {
        sendJSONresponse(res, 404, {
          "message": "no blogs found"
        });
        return;
      } else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(results);
      sendJSONresponse(res, 200, buildBlogList(req, res, results));
    });
};

var buildBlogList = function (req, res, results) {
  var blogs = [];
  results.forEach(function (obj) {
    blogs.push({
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      createdOn: obj.createdOn,
      id: obj._id
    });
  });
  return blogs;
};

module.exports.getSingle = function (req, res) {
  if (req.params && req.params.id) {
    Blog
      .findById(req.params.id)
      .exec(function (err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "id not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No id specified');
    sendJSONresponse(res, 404, {
      "message": "No id in request"
    });
  }
};

module.exports.add = function (req, res) {
  Blog
    .create({
      blogTitle: req.body.blogTitle,
      blogText: req.body.blogText,
      createdOn: req.body.createdOn,
    }, function (err, blog) {
      if (err) {
        console.log(err);
        sendJSONresponse(res, 400, err);
      } else {
        console.log(blog);
        sendJSONresponse(res, 201, blog);
      }
    }
    );
};

module.exports.edit = function (req, res) {
  Blog
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: { blogTitle: req.body.blogTitle, blogText: req.body.blogText } },
      function (err, response) {
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          sendJSONresponse(res, 201, response);
        }
      }
    );
};

module.exports.delete = function (req, res) {
  Blog
    .findByIdAndRemove(req.params.id)
    .exec(
      function (err, response) {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 204, null);
        }
      }
    );
};