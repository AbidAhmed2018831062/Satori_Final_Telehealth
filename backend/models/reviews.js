
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviews = new Schema({
 eventId:String,
 email:String,
 id:String,
 userImage:String,
 careProviderId:String,
 careProviderName:String,
 careProviderImage:String,
 rating:String,
 feedback:String

});

const review = mongoose.model('reviews', reviews);

module.exports = review;