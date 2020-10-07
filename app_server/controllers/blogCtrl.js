var request = require('request');
var apiOptions = {
  server: "http://3.90.10.246"
};

module.exports.list = function (req, res) {
  var requestOptions, path;
  path = '/api/blogs';
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      res.render('blogList', {
        title: 'Blog List',
        blogs: body
      });
    }
  );
};

module.exports.addPage = function (req, res) {
  res.render('blogAdd', { title: 'Add Blog' });
};

module.exports.add = function (req, res) {
  var requestOptions, path, postdata;
  path = '/api/blogs/';

  postdata = {
    blogTitle: req.body.blogTitle,
    blogText: req.body.blogText
  }; 

  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  
  request(
    requestOptions,
    function(err, response, body) {
      if (response.statusCode === 201) {
        res.redirect('/blog');
      } else {
        _showError(req, res, response.statusCode);
      } 
    }
  );
};

module.exports.editPage = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.id;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      res.render('blogEdit', {
        title: 'Edit Blog',
        blog: body
      });
    }
  );
};

module.exports.edit = function (req, res) {
  var requestOptions, path, postdata;
  path = '/api/blogs/' + req.params.id;

  postdata = {
    blogTitle: req.body.blogTitle,
    blogText: req.body.blogText
  }; 

  requestOptions = {
    url: apiOptions.server + path,
    method: "PUT",
    json: postdata
  };
  
  request(
    requestOptions,
    function(err, response, body) {
      if (response.statusCode === 201) {
        res.redirect('/blog');
      } else {
        _showError(req, res, response.statusCode);
      } 
    }
  ); 
};

module.exports.deletePage = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.id;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(
    requestOptions,
    function (err, response, body) {
      res.render('blogDelete', {
        title: 'Delete Blog',
        blog: body
      });
    }
  );
};

module.exports.delete = function (req, res) {
  var requestOptions, path;
  path = '/api/blogs/' + req.params.id;

  requestOptions = {
    url: apiOptions.server + path,
    method: "DELETE",
    json: {}
  };

  request(
    requestOptions,
    function (err, response, body) {
      if (response.statusCode === 204) {
        res.redirect('/blog');
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  ); 
};