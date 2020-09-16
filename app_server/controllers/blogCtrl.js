module.exports.list = function(req, res) {
  res.render('blogList',
    {
      title: 'Blog List',
      blogs: [
        {
          blogTitle: 'HTML',
          blogText: 'Defines the structure of a webpage',
          createdOn: '2018-01-01'
        },
        {
          blogTitle: 'CSS',
          blogText: 'Defines the style of a webpage',
          createdOn: '2019-02-02'
        },
        {
          blogTitle: 'JavaScript',
          blogText: 'Defines extra functioning of a webpage',
          createdOn: '2020-03-03'
        }
      ]
    }
  );
};

module.exports.add = function(req, res) {
  res.render('blogAdd', { title: 'Blog Add' });
};

module.exports.edit = function(req, res) {
  res.render('blogEdit', { title: 'Edit Blog' });
};

module.exports.delete = function (req, res) {
  res.render('blogDelete', { title: 'Delete Blog' });
};