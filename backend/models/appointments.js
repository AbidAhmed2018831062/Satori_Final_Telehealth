const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointments = new Schema({
     memberId:{
          require:true,
           type:String,
         },
     providerEmail:String,
     memberEmail:String,
     providerId:{
          require:true,
           type:String,
         },
     dateTime:Date,
     status:String,
     sponsored:Boolean,
     topic:Array,
     problem:Array,
     memberNote:String,
     providerNote:String,
     payoutStatus:String,
     event:Number,
     paymentInfo:String,

});

const appointment = mongoose.model('appointments', appointments);

module.exports = appointment;