var mongoose = require('mongoose');

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


var NewTeam = mongoose.model('teams', TeamSchema);

module.exports = NewTeam;