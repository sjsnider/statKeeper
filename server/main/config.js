"use strict";

var mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    middle      = require('./middleware');

var handler = require('./request-handler');

mongoose.connect(process.env.MONCONNECT || 'mongodb://localhost/statKeeper');

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
  app.post('/newLeague', handler.addNewLeague);
  app.post('/removeLeague', handler.removeLeague);
  app.post('/newTeam', handler.addNewTeam);
  app.post('/newPlayer', handler.addNewPlayer);
  app.post('/stats', handler.addPlayerStats);
  app.get('/leagues', handler.fetchAllLeagues);
  app.get('/checkLeague/:name', handler.checkLeague);
  app.get('/teams/:league', handler.fetchTeams);
  app.get('/sports', handler.fetchSports);
  app.get('/players/:league/:team', handler.fetchPlayersByTeam);
  app.get('/players/:league', handler.fetchPlayersByLeague);
};

