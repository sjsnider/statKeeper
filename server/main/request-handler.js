var NewTeam = require('./team');
var NewPlayer = require('./player');
var NewSport = require('./sport');
var NewLeague = require('./league');

exports.addNewTeam = function(req, res){
    var newTeam = new NewTeam({
      name: req.body.name,
      league: req.body.league
    });
    newTeam.save(function(error, team){
      if(error){
        console.log('error');
      } else {
        console.log('success');
        res.send(200,team);
      }
    });
};

exports.fetchTeams = function(req, res){
    NewTeam.find({league: req.params.league},function(error, teams){
      if(teams){
        res.send(200, teams);
      }
    });
};

exports.fetchPlayersByTeam = function(req, res){
    NewPlayer.find({league: req.params.league, team: req.params.team},function(error, players){
      res.send(200, players);
    });
};
exports.addNewPlayer = function(req, res){
    var newPlayer = new NewPlayer({
      name: req.body.name,
      league: req.body.league,
      team: req.body.team
    });
    newPlayer.save(function(error, player){
      if(error){
        console.log('error');
      } else {
        console.log('success');
        res.send(200,player);
      }
    });
};


exports.fetchPlayersByLeague = function(req, res){
    NewPlayer.find({league: req.params.league},function(error, players){
      res.send(200, players);
    });
};

exports.checkLeague = function(req, res){
    NewLeague.findOne({name: req.params.name},function(error, league){
      res.send(200, league);
    });
};

exports.fetchAllLeagues = function(req, res){
    NewLeague.find(function(error, leagues){
      if(leagues){
        res.send(200, leagues);
      }
    });
};

exports.addNewLeague = function(req, res){
    var newLeague = new NewLeague({
      name: req.body.newLeague,
      sport: req.body.sport,
      statCategories: req.body.statCategories
    });
    newLeague.save(function(error, league){
      if(error){
        console.log('error');
      } else {
        console.log('success');
        res.send(200,league);
      }
    });
};

exports.removeLeague = function(req, res){
	console.log(req.body.league);
	NewLeague.find({name: req.body.league}).remove(function(error, league){
		if(error){
			console.log('error');
		} else {
			res.send(200,league);
		}
	});
};

exports.addPlayerStats = function(req, res){
  	var stats ={    
      	PA: req.body.PA,   
      	ABs: req.body.ABs,
      	Hits: req.body.Hits,
      	Walks: req.body.Walks,
      	Singles: req.body.Singles,
      	Doubles: req.body.Doubles,
      	Triples: req.body.Triples,
      	HRs: req.body.HRs,
      	RBIs: req.body.RBIs,
      	Runs: req.body.Runs
    };

  	NewPlayer.findOneAndUpdate({
    	name: req.body.name,
    	league: req.body.league,
    	team: req.body.team
  	},
  	{$push: {stats: stats}},
  	{safe:true, upsert:true}, 
  	function(err,model){
    	if(err){
     	 	console.log('error');
    	} else {
      		console.log('success');
      		res.send(200,model);
  		}
  	});
  };

 exports.fetchSports = function(req, res){
    NewSport.find(function(error, sports){
      if(sports){
        res.send(200, sports);
      }
    });
 };




