const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchups = new Schema({
appointments:Array,
providerId:String,
memberId:String

});

const matchup = mongoose.model('matchups', matchups);

module.exports = matchup;