angular.module('statKeeper.main.stats', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/stats', {
      templateUrl: 'stats/stats.tpl.html',
      controller: 'StatsController'
    });
})
.controller('StatsController', function ($scope, $http) {
	$scope.showTeams = false;
    $scope.showPlayers = false;
    $scope.statEnter = false;

	var leaguesPromise = $http.get('/leagues');
    leaguesPromise.success(function(data, status, headers, config){
    $scope.displayLeagues = data;
    });

    $scope.displayTeams = function(){
    	if($scope.allLeagues){
	   		$scope.league = $scope.allLeagues.name;
	   		$scope.stats = $scope.allLeagues.statCategories;
	   		$scope.PAshow = false;
			$scope.ABsshow = false;
			$scope.Hitsshow = false;
			$scope.Walksshow = false;
			$scope.singlesshow = false;
			$scope.doublesshow = false;
			$scope.triplesshow = false;
			$scope.HRsshow = false;
			$scope.RBIsshow = false;
			$scope.Runsshow = false;
			for (var i=0; i<$scope.stats.length; i++){
				console.log($scope.stats[i]);
				switch($scope.stats[i]){
					case 'PA':
						$scope.PAshow = true;
						break;
					case 'ABs':
						$scope.ABshow = true;
						break;
					case 'Hits':
						$scope.Hitsshow = true;
						break;
					case 'Walks':
						$scope.Walksshow = true;
						break;
					case '1Bs':
						$scope.singlesshow = true;
						break;
					case '2Bs':
						$scope.doublesshow = true;
						break;
					case '3Bs':
						$scope.triplesshow = true;
						break;
					case 'HRs':
						$scope.HRsshow = true;
						break;
					case 'RBIs':
						$scope.RBIsshow = true;
						break;
					case 'Runs':
						$scope.Runsshow = true;
						break;
				}
			}
			console.log($scope.HRsshow);
		} else {
			alert('You must select a league!');
	   		return;
		}
    	$scope.showTeams = true;
    	$scope.showPlayers = false;
    	$scope.statEnter = false;
    	var teamPromise = $http.get('/teams/' + $scope.league);
  		teamPromise.success(function(data, status, headers, config){
    		$scope.displayTeams = data;
  		});
    };

    $scope.displayPlayers = function(){
    	if($scope.allTeams){
	   		$scope.team = $scope.allTeams.name;
	   		console.log($scope.team);
		} else {
			alert('You must select a team!');
	   		return;
		}
    	$scope.showPlayers = true;
    	$scope.statEnter = false;
		var playerPromise = $http.get('/players/' + $scope.league + '/' + $scope.team);
	  	playerPromise.success(function(data, status, headers, config){
	    	$scope.playersArray = data;
    	});

    };

    $scope.displayPlayer = function(){
    	if($scope.allPlayers){
	   		$scope.player = $scope.allPlayers.name;
	   		console.log($scope.player);
		} else {
			alert('You must select a player!');
	   		return;
		}
		$scope.statEnter = true;
		console.log($scope.stats);
    };

    $scope.statSubmit = function(){
    	console.log($scope.singles, $scope.doubles, $scope.triples);
   		var leaguePromise = $http.post('/stats', {
   		  name: $scope.player,
   		  league: $scope.league,
   		  team: $scope.team,
          PA: $scope.PA,   
          ABs: $scope.ABs,
          Hits: $scope.Hits,
          Walks: $scope.Walks,
          Singles: $scope.singles,
          Doubles: $scope.doubles,
          Triples: $scope.triples,
          HRs: $scope.HRs,
          RBIs: $scope.RBIs,
          Runs: $scope.Runs
        });
      leaguePromise.success(function(data, status, headers, config){
      	$scope.statEnter = false;
      	console.log($scope.statEnter);
      });
    };
});