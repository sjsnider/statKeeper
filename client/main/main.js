(function (angular) {
  "use strict";
  angular.module('statKeeper.main', ['ngRoute', 'statKeeper.main.leagues', 'statKeeper.main.viewStats' , 'statKeeper.main.stats'])
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
    $scope.league = '';
    $scope.curSport = '';
    $scope.displayLeagues = [];
    $scope.predicate = "name";
    $scope.showStatCats = false;

    var sportPromise = $http.get('/sports');
    sportPromise.success(function(data, status, headers, config){
      $scope.sports=data;
    });

    $scope.update = function(){
      $scope.curSport = $scope.allSports.name;
      $scope.showStatCats = true;
      $scope.removedCategoriesArray = [];
      console.log($scope.removedCategoriesArray);
      for (var i=0;i<$scope.sports.length;i++){
        if($scope.sports[i].name === $scope.curSport){
          $scope.categoriesArray = $scope.sports[i].statCategories.slice();
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

    $scope.removeLeague = function(league){
      console.log('in remove league' + league);
      var leagueRemove = $http.post('/removeLeague', {
        league: league
      });
      $scope.getLeagues();
    };

    $scope.leagueSubmit = function(){
      var newLeague = $scope.league;
      if($scope.allSports){
        $scope.sport = $scope.allSports.name;
      } else {
        alert('You must select a sport!');
        return;
      }
      var statCategories = $scope.categoriesArray;
      console.log(statCategories);
      var leaguePromise = $http.post('/newLeague', {
          newLeague: newLeague,   
          sport: $scope.sport,
          statCategories: statCategories
        });
      leaguePromise.success(function(data, status, headers, config){
        $scope.displayLeagues.push(data);
        $scope.league = "Create Another One!";
      });
    };
    $scope.getLeagues = function(){
      var leaguesPromise = $http.get('/leagues');
      leaguesPromise.success(function(data, status, headers, config){
        $scope.displayLeagues = data;
        for(var i=0; i<$scope.displayLeagues.length; i++){
          if($scope.displayLeagues[i].sport === "Softball"){
            $scope.displayLeagues[i].picPath = '/softball.png';
          } else {
            $scope.displayLeagues[i].picPath = '/basketball.png';
          }
        }
      });
    };
    $scope.getLeagues();
  });
}(angular));
