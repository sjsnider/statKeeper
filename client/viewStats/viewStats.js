angular.module('statKeeper.main.viewStats', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/viewStats', {
      templateUrl: 'viewStats/viewStats.tpl.html',
      controller: 'ViewStatsController'
    });
})
.controller('ViewStatsController', function ($scope, $http) {
	$scope.statShow = false;
  	var leaguesPromise = $http.get('/leagues');
    leaguesPromise.success(function(data, status, headers, config){
    $scope.displayLeagues = data;
    });

    $scope.displayStats = function(){
    	if($scope.allLeagues){
	   		$scope.league = $scope.allLeagues.name;
	   		console.log($scope.league);
		} else {
			alert('You must select a team!');
	   		return;
		}
		$scope.orderByField = 'name';
  		$scope.reverseSort = false;
		$scope.playersDisplayArray = [];
		$scope.statShow = true;
		var playerPromise = $http.get('/players/' + $scope.league);
	  	playerPromise.success(function(data, status, headers, config){
	    	$scope.playersArray = data;
	    	console.log($scope.playersArray);
	    
	    	for(var i=0; i<$scope.playersArray.length; i++){
	    		var playerInfo = {};
	    		playerInfo.pa = playerInfo.ab = playerInfo.hits = playerInfo.bb = playerInfo.singles = playerInfo.doubles = playerInfo.triples
	    		= playerInfo.hrs = playerInfo.rbis = playerInfo.runs = 0;
	    		playerInfo.name = $scope.playersArray[i].name;
	    		playerInfo.team = $scope.playersArray[i].team;
	    		playerInfo.gp = $scope.playersArray[i].stats.length;
	    		for (var x=0; x<$scope.playersArray[i].stats.length; x++){
	    			playerInfo.pa += parseFloat($scope.playersArray[i].stats[x].PA);
	    			playerInfo.ab += parseFloat($scope.playersArray[i].stats[x].ABs);
	    			playerInfo.hits += parseFloat($scope.playersArray[i].stats[x].Hits);
	    			playerInfo.bb += parseFloat($scope.playersArray[i].stats[x].Walks);
	    			playerInfo.singles += parseFloat($scope.playersArray[i].stats[x].Singles);
	    			playerInfo.doubles += parseFloat($scope.playersArray[i].stats[x].Doubles);
	    			playerInfo.triples += parseFloat($scope.playersArray[i].stats[x].Triples);
	    			playerInfo.hrs += parseFloat($scope.playersArray[i].stats[x].HRs);
	    			playerInfo.rbis += parseFloat($scope.playersArray[i].stats[x].RBIs);
	    			playerInfo.runs += parseFloat($scope.playersArray[i].stats[x].Runs);
	    		}
	    		if(playerInfo.bb + playerInfo.hits===0){
	    			playerInfo.obp = 0.000;
	    		} else{
	    			playerInfo.obp = ((playerInfo.bb + playerInfo.hits)/playerInfo.pa).toFixed(3);
	    		}
	    		if(playerInfo.hits===0){
	    			playerInfo.avg = 0.000;
	    		} else {
	    			playerInfo.avg = (playerInfo.hits/playerInfo.ab).toFixed(3);
	    		}
	    		$scope.playersDisplayArray.push(playerInfo);
	    	}
	    });
    	
    };
});