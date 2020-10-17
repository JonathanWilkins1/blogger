var app = angular.module('bloggerApp', ['ngRoute', 'ui.router']);

/* Routes */
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "home.html",
      controller: 'HomeController',
      controllerAs: 'vm'
    })

    .when('/blog', {
      templateUrl: "blogList.html",
      controller: 'ListController',
      controllerAs: 'vm'
    })

    .when('/blog/add', {
      templateUrl: "blogAdd.html",
      controller: 'AddController',
      controllerAs: 'vm'
    })

    .when('/blog/edit/:id', {
      templateUrl: "blogEdit.html",
      controller: 'EditController',
      controllerAs: 'vm'
    })

    .when('/blog/delete/:id', {
      templateUrl: "blogDelete.html",
      controller: 'DeleteController',
      controllerAs: 'vm'
    })

    .otherwise({ redirectTo: '/' });
});

/* Controllers */
app.controller('HomeController', function() {
  var vm = this;
  vm.title = "Jonathan Wilkins\' Blog Site";
});
/*
app.controller('HomeController', function HomeController() {
  var vm = this;
  vm.title = "Jonathan Wilkins\' Blog Site";
});

app.controller('ListController', function ListController($http) {
  var vm = this;
  vm.title = "List Blogs";

  getAllBlogs($http)
    .success(function(data) {
      vm.blogs = data;
    });
  
  function substr() {
    return this.substring(0, 10);
  };
});

app.controller('AddController', function AddController() {
  var vm = this;
  vm.title = "Add Blog";  
});

app.controller('EditController', function EditController() {
  var vm = this;
  vm.title = "Edit Blog";
});

app.controller('DeleteController', function DeleteController() {
  var vm = this;
  vm.title = "Delete Blog";
});
*/
/* REST Web API Functions */
/*
function getAllBlogs($http) {
  return $http.get('/api/blogs/');
}

function getBlogById($http, id) {
  return $http.get('/api/blogs/' + id);
}

function addBlog($http, data) {
  return $http.post('/api/blogs/', data);
}

function editBlogById($http, id, data) {
  return $http.put('/api/blogs/' + id, data);
}

function deleteBlogById($http, id) {
  return $http.delete('/api/blogs/' + id);
}
*/