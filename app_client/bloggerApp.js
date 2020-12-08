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

    .when('/blog/comment/:id', {
      templateUrl: "blogComment.html",
      controller: 'CommentController',
      controllerAs: 'vm'
    })

    .when('/register', {
      templateUrl: "registerPage.html",
      controller: 'RegisterController',
      controllerAs: 'vm'
    })

    .when('/login', {
      templateUrl: "loginPage.html",
      controller: 'LoginController',
      controllerAs: 'vm'
    })

    .otherwise({ redirectTo: '/' });
});

/* Controllers */
app.controller('HomeController', function HomeController() {
  var vm = this;
  vm.title = "Jonathan Wilkins\' Blog Site";
});

app.controller('ListController', [ '$http', 'authentication', '$scope', '$interval', function ListController($http, authentication, $scope, $interval) {
  var vm = this;
  vm.title = "List Blogs";
  vm.blogs = {};

  getAllBlogs($http)
    .success(function(data) {
      vm.blogs = data;
    })
    .error(function(e) {
      console.log("Could not get the list of blogs");
    });
  vm.isLoggedIn = function() {
    return authentication.isLoggedIn();
  }
  vm.isCurrentUser = function(userEmail) {
    if(!vm.isLoggedIn())
      return false;
    return authentication.currentUser().email == userEmail;
  }
  $scope.callAtInterval = function() {
    console.log("Interval occurred");
    getAllBlogs($http)
      .success(function(data) {
        vm.blogs = data;
      })
      .error(function (e) {
        console.log("Could not get list of blogs");
      });
    }
  $interval(
    function() {
      $scope.callAtInterval();
    },
    3000, 0, true
  );
}]);

app.controller('AddController', [ '$http', '$state', 'authentication', function AddController($http, $state, authentication) {
  var vm = this;
  vm.blog = {};
  vm.title = 'Add Blog';

  vm.submit = function() {
    vm.blog.blogTitle = blogForm.blogTitle.value;
    vm.blog.blogText = blogForm.blogText.value;
    vm.blog.email = authentication.currentUser().email;
    vm.blog.name = authentication.currentUser().name;

    addBlog($http, authentication, vm.blog)
      .success(function() {
        console.log("Blog added successfully");
        $state.go('blogList');
      })
      .error(function(e) {
        console.log("Could not add blog");
      });
  }
  vm.cancel = function() {
    $state.go('blogList');
  }
}]);

app.controller('EditController', [ '$http', '$state', '$routeParams', 'authentication', function EditController($http, $state, $routeParams, authentication) {
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id;
  vm.title = "Edit Blog";

  getBlogById($http, vm.id)
    .success(function(data) {
      vm.blog = data;
      console.log("Retrieved blog " + vm.id + " successfully");
    })
    .error(function(e) {
      console.log("Could not get blog " + vm.id);
    });

  vm.submit = function() {
      vm.blog.blogTitle = blogForm.blogTitle.value;
      vm.blog.blogText = blogForm.blogText.value;

      editBlogById($http, authentication, vm.id, vm.blog)
        .success(function() {
          console.log("Blog " + vm.id + " edited successfully");
          $state.go('blogList');
        })
        .error(function(e) {
          console.log("Could not edit blog " + vm.id);
        });
  }

  vm.cancel = function() {
    $state.go('blogList');
  }
}]);

app.controller('DeleteController', [ '$http', '$state', '$routeParams', 'authentication', function DeleteController($http, $state, $routeParams, authentication) {
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id;
  vm.title = "Delete Blog";

  getBlogById($http, vm.id)
    .success(function(data) {
      vm.blog = data;
      console.log("Retrieved blog " + vm .id + " successfully");
    })
    .error(function(e) {
      console.log("Could not get blog " + vm.id);
    });

  vm.submit = function() {
    deleteBlogById($http, authentication, vm.id)
      .success(function() {
        console.log("Blog " + vm.id + " deleted successfully");
        $state.go('blogList');
      })
      .error(function(e) {
        console.log("Could not delete blog " + vm.id);
      });
  }

  vm.cancel = function() {
      $state.go('blogList');
  }
}]);

app.controller('CommentController', [ '$http', '$state', '$routeParams', 'authentication', '$scope', '$interval',
	function CommentController($http, $state, $routeParams, authentication, $scope, $interval) {
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id;
  vm.title = "Comment on this blog";
  vm.comment = {};

  getBlogById($http, vm.id)
    .success(function(data) {
      vm.blog = data;
      console.log("Retrieved blog " + vm .id + " successfully");
    })
    .error(function(e) {
      console.log("Could not get blog " + vm.id);
    });

  vm.submit = function() {
    vm.comment.text = commentForm.commentText.value;
    vm.comment.email = authentication.currentUser().email;
    vm.comment.name = authentication.currentUser().name;

    commentBlogById($http, vm.id, vm.comment)
      .success(function() {
        console.log("Blog " + vm.id + " commented on successfully");
        $state.go('blogList');
      })
      .error(function(e) {
        console.log("Could not comment on blog " + vm.id);
      });
  }

  $scope.callAtInterval = function() {
    console.log("Interval occurred");
    getBlogById($http, vm.id)
      .success(function(data) {
        vm.blogs = data;
      })
      .error(function (e) {
        console.log("Could not get list of comments");
      });
    }
  $interval(
    function() {
      $scope.callAtInterval();
    },
    3000, 0, true
  );
}]);

/* REST Web API Functions */
function getAllBlogs($http) {
  return $http.get('/api/blogs/');
}

function getBlogById($http, id) {
  return $http.get('/api/blogs/' + id);
}

function addBlog($http, authentication, data) {
  return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function editBlogById($http, authentication, id, data) {
  return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function deleteBlogById($http, authentication, id) {
  console.log(authentication);
  return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function commentBlogById($http, id, data) {
  return $http.put('/api/comments/' + id, data);
}

//*** State provider ***
app.config(function($stateProvider) {
  $stateProvider
    .state('blogList', {
      url: '/blog',
      templateUrl: 'blogList.html',
      controller : 'ListController'
    });
});
