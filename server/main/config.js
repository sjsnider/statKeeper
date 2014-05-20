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
    console.log('sport: ' + req.body.sport);
    console.log('League: ' + req.body.newLeague);
    var newLeague = new NewLeague({
      name: req.body.newLeague,
      sport: req.body.sport
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

  app.get('/leagues', function(req, res){
    NewLeague.find(function(error, leagues){
      if(leagues){
        res.send(200, leagues);
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
};




var LeagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  sport: {
    type: String,
    required: true
  }
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

var NewLeague = mongoose.model('leagues', LeagueSchema);
var NewSport = mongoose.model('sports', SportSchema);
var newSport = new NewSport({
  name: 'Softball',
  statCategories: ['GP', 'PA', 'ABs', 'Hits', 'Walks', 'OBP', 'AVG', '1Bs', '2Bs', '3Bs', 'HRs', 'RBIs', 'Runs']
});
var newSport2 = new NewSport({
  name: 'Basketball',
  statCategories: ['GP', 'Points', 'PPG', 'FGA', 'FGM', '3PA', '3PM', 'FTA', 'FTM', 'FG%', '3P%', 'FT%', 'Assists', 'APG', 
  'Steals', 'SPG', 'Blocks', 'BPG']
});

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
