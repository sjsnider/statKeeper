var mongoose = require('mongoose');

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

var NewSport = mongoose.model('sports', SportSchema);

var newSport = new NewSport({
  name: 'Softball',
  statCategories: ['PA', 'ABs', 'Hits', 'Walks', '1Bs', '2Bs', '3Bs', 'HRs', 'RBIs', 'Runs']
});
var newSport2 = new NewSport({
  name: 'Basketball',
  statCategories: ['Points', 'FGA', 'FGM', '3PA', '3PM', 'FTA', 'FTM', 'Assists', 
  'Steals', 'Blocks']
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

module.exports = NewSport;