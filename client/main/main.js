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
    $scope.league = 'New League name here';
    $scope.displayLeagues = [];
    $scope.predicate = "name";
    $scope.leagueSubmit = function(){
      var newLeague = $scope.league;
      var leaguePromise = $http.post('/newLeague', {newLeague: newLeague});
      leaguePromise.success(function(data, status, headers, config){
        console.log(data);
        $scope.displayLeagues.push(data);
      });
      $scope.league = "Create Another One!";
    };
    var leaguesPromise = $http.get('/leagues');
    leaguesPromise.success(function(data, status, headers, config){
      console.log(data);
      $scope.displayLeagues = data;
    });
  });
}(angular));
