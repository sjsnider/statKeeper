var mongoose = require('mongoose');

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

var NewLeague = mongoose.model('leagues', LeagueSchema);

module.exports = NewLeague;