var app = angular.module("omdbApp",['ngRoute']);

app.controller("searchController", function($rootScope, $scope, $http){
  window.scope=$scope;
  $rootScope.view = {};
  $rootScope.view.searchBy='s';
  $rootScope.keyword="";
  $rootScope.view.show={};
  $rootScope.view.id="";

  $scope.getMovie = function(title){
    var title = title.replace(/ /g,"+");
    console.log("http://www.omdbapi.com/?"+$scope.view.searchBy+"="+title)
    $http.get("http://www.omdbapi.com/?"+$scope.view.searchBy+"="+title)
    .then(function(res){
      if($scope.view.searchBy==='t'){$scope.view.search=res}
      else{$scope.view.search = res.data.Search;}
      console.log($scope.view.search)
    })
  };

  $scope.searchBy = function(by){
    $scope.view.searchBy = by;
  };

  $scope.setMovieId = function(id){
    $rootScope.id = id;
  }
})


app.controller("showController", function($rootScope, $scope){
  var id = $rootScope.movie.id;
  $scope.view.show={};
  $scope.getMovieById = function(id){
    $http.get("http://www.omdbapi.com/?i="+id)
    .then(function(res){
      $scope.view.show = res.data;
      console.log(res.data);
    })
  }
})


app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './templates/search.html',
      controller: 'searchController'
    })
    .when('/show/', {
      templateUrl: './templates/show.html',
      controller: 'searchController'
    })
  $locationProvider.html5Mode(true);
});

