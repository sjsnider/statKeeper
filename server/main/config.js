"use strict";

var mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    middle      = require('./middleware');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/statKeeper');
/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(middle.cors);
  app.use(express.static(__dirname + '/../../client'));
  app.use('/note', routers.NoteRouter);
  app.use(middle.logError);
  app.use(middle.handleError);
  app.post('/newLeague', function(req, res){
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
  });

  app.post('/newTeam', function(req, res){
      console.log('name: ' + req.body.name);
      console.log('league: ' + req.body.league);
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
  });

  app.post('/newPlayer', function(req, res){
      console.log('name: ' + req.body.name);
      console.log('league: ' + req.body.league);
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
  });

  app.get('/leagues', function(req, res){
    NewLeague.find(function(error, leagues){
      if(leagues){
        res.send(200, leagues);
      }
    });
  });

  app.get('/teams/:league', function(req, res){
    NewTeam.find({league: req.params.league},function(error, teams){
      if(teams){
        res.send(200, teams);
      }
    });
  });

  app.get('/sports', function(req, res){
    NewSport.find(function(error, sports){
      if(sports){
        res.send(200, sports);
      }
    });
  });

  app.get('/checkLeague/:name', function(req, res){
    NewLeague.findOne({name: req.params.name},function(error, league){
      res.send(200, league);
    });
  });

  app.get('/players/:league/:team', function(req, res){
    console.log(req.params.league);
    console.log(req.params.team);
    NewPlayer.find({league: req.params.league, team: req.params.team},function(error, players){
      res.send(200, players);
    });
  });
};




var LeagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  sport: {
    type: String,
    ref: 'NewSport', 
    required: true
  },
  statCategories: []
});

LeagueSchema.pre('save', function(next){
  next();
});

var SportSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  statCategories: []
});

SportSchema.pre('save', function(next){
  next();
});

var TeamSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  league:{
    type: String,
    ref: 'NewLeague', 
    required: true
  }
});

TeamSchema.index({name:1, league:1},{unique:true});

TeamSchema.pre('save', function(next){
  next();
});

var PlayerSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  league:{
    type: String,
    ref: 'NewLeague', 
    required: true
  },
  team:{
    type: String,
    ref: 'NewTeam', 
    required: true
  },
  stats: []
});

PlayerSchema.index({name:1, league:1, team:1},{unique:true});

PlayerSchema.pre('save', function(next){
  next();
});

var NewSport = mongoose.model('sports', SportSchema);
var newSport = new NewSport({
  name: 'Softball',
  statCategories: ['GP', 'PA', 'ABs', 'Hits', 'Walks', '1Bs', '2Bs', '3Bs', 'HRs', 'RBIs', 'Runs']
});
var newSport2 = new NewSport({
  name: 'Basketball',
  statCategories: ['GP', 'Points', 'FGA', 'FGM', '3PA', '3PM', 'FTA', 'FTM', 'Assists', 
  'Steals', 'Blocks']
});

var NewLeague = mongoose.model('leagues', LeagueSchema);
var NewTeam = mongoose.model('teams', TeamSchema);
var NewPlayer = mongoose.model('players', PlayerSchema);
newSport.save(function(error, sport){
  if(error){
    console.log('error');
  } else {
    console.log('success');
  }
});

newSport2.save(function(error, sport){
  if(error){
    console.log('error');
  } else {
    console.log('success');
  }
});
