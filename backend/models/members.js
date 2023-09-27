const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const members = new Schema({
   email:{
    require:true,
     type:String,
   },
   password:{
    require:true,
     type:String,
   },
   companyId:String,
 firstName:String,
 lastName:String,
 dob:String,
 images:String,
 country:String,
 profileBio:String,
 specializations:Array,
 degree:String,
 license:String,
 active:Boolean,
 payoutAccount:String,
 calendlyId:String,
 languages:Array,
 sponsoredHours:Number,
 paymentInfo:String,
 matChups:Array,
 onboardDate:String,
 companyName:String,
 hours:Number,
 valid:String,
});

const member = mongoose.model('members', members);

module.exports = member;