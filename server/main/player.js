var mongoose = require('mongoose');

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

var NewPlayer = mongoose.model('players', PlayerSchema);

module.exports = NewPlayer;