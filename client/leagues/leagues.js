angular.module('statKeeper.main.leagues', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/leagues/:league', {
      templateUrl: 'leagues/leagues.tpl.html',
      controller: 'LeagueController'
    });
})
.controller('LeagueController', function ($scope, $routeParams, $http, $location) {
	$scope.league = $routeParams.league;
 	// make sure this is an actual league page
  	var checkLeague = $http.get('/checkLeague/' + $scope.league);
  	checkLeague.success(function(data,status,headers,config){
  		if(!data){
  			$location.path('/');
  		}
  	});

  	$scope.teams = [{name: ''}];
  	$scope.displayTeams = [];
  	$scope.playersArray = [];
  	$scope.newPlayersArray = [{name: ''}];

  	var teamPromise = $http.get('/teams/' + $scope.league);
  	teamPromise.success(function(data, status, headers, config){
    	$scope.displayTeams = data;
  	});

	$scope.teamSubmit = function(){
		console.log($scope.teams);
	  	for (var i=0;i<$scope.teams.length;i++) {
		   	var newTeam = $scope.teams[i].name;
		   	console.log(newTeam);
		    var teamPromise = $http.post('/newTeam', {
		    	name: newTeam,   
		        league: $scope.league
		     });
		    teamPromise.success(function(data, status, headers, config){
		        $scope.displayTeams.push(data);
		    });
		}
		$scope.teams = [{name: ''}];
	};

	$scope.update = function(){
		var team = $scope.allTeams.name;
		var playerPromise = $http.get('/players/' + $scope.league + '/' + team);
	  	playerPromise.success(function(data, status, headers, config){
	    	$scope.playersArray = data;
	  	});
	};

	$scope.playerSubmit = function(){
		if($scope.allTeams){
	   		var team = $scope.allTeams.name;
	   		console.log(team);
		} else {
			alert('You must select a team!');
	   		return;
		}
		for (var i=0;i<$scope.newPlayersArray.length;i++) {
	   		var newPlayer = $scope.newPlayersArray[i].name;
	   		console.log(newPlayer);
	    	var playerPromise = $http.post('/newPlayer', {
	    		name: newPlayer,   
	        	league: $scope.league,
	        	team: team
	     	});
	    	playerPromise.success(function(data, status, headers, config){
	        	console.log(data);
	        	$scope.playersArray.push(data);
	    	});
		}
		$scope.newPlayersArray = [{name: ''}];
  	};
});