
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const events = new Schema({
 event:String,
 invitee:String,
 email:String,
 id:String,
 notes:String,
 start_time:String,
 eventID:String,
 meetingLink:String,
 confirmed:Boolean,
 userUri:String,
 careProviderId:String,
 careProviderName:String,
 careProviderImage:String,
 show:Boolean,
 reviewed:Boolean,
 complete:Boolean,
 noShow:Boolean,
 name:String,
 dob:String,
 careNotes:String

});

const event = mongoose.model('events', events);

module.exports = event;