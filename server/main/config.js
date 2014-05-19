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
    console.log('league: ' + req.body.newLeague);
    var newLeague = NewLeague({
      name: req.body.newLeague
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
};




var LeagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

LeagueSchema.pre('save', function(next){
  next();
});

var NewLeague = mongoose.model('leagues', LeagueSchema);