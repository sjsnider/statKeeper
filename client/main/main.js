(function (angular) {
  "use strict";
  angular.module('statKeeper.main', ['ngRoute', 'statKeeper.main.note'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/main.tpl.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('MainController', function ($scope, $http) {
    $scope.league = 'League name';
    $scope.displayLeagues = [];
    $scope.predicate = "name";

    var sportPromise = $http.get('/sports');
    sportPromise.success(function(data, status, headers, config){
      console.log(data);
      $scope.sports=data;
      $scope.form = {type: $scope.sports[0].name};
    });

    $scope.update = function(){
      console.log($scope.allSports.name);
      console.log($scope.sports);
      $scope.removedCategoriesArray = [];
      for (var i=0;i<$scope.sports.length;i++){
        if($scope.sports[i].name === $scope.allSports.name){
          $scope.categoriesArray = $scope.sports[i].statCategories;
        }
      }
    };

    $scope.add = function(index){
      var val = $scope.removedCategoriesArray[index];
      $scope.removedCategoriesArray.splice(index,1);
      $scope.categoriesArray.push(val);
    };

    $scope.remove = function(index){
      var val = $scope.categoriesArray[index];
      $scope.categoriesArray.splice(index,1);
      $scope.removedCategoriesArray.push(val);
    };

    $scope.leagueSubmit = function(){
      var newLeague = $scope.league;
      console.log(newLeague);
      var sport = $scope.allSports.name;
      var leaguePromise = $http.post('/newLeague', {newLeague: newLeague, sport: sport});
      leaguePromise.success(function(data, status, headers, config){
        console.log(data);
        $scope.displayLeagues.push(data);
        $scope.league = "Create Another One!";
      });
    };
    var leaguesPromise = $http.get('/leagues');
    leaguesPromise.success(function(data, status, headers, config){
      console.log(data);
      $scope.displayLeagues = data;
    });
  });
}(angular));
