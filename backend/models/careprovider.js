const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const careProviders = new Schema({
    email:{
      require:true,
       type:String,
     },
   password:{
    require:true,
     type:String,
   },
 firstName:String,
 lastName:String,
 dob:Date,
 images:String,
 country:String,
 languages:Array,
 sponsoredHours:Number,
 paymentInfo:String,
 matChups:Array,
 degree:String,
specializations:Array,
 booking:Boolean,
 license:String,
 experience:Number,
 expertise:Array,
 onboardDate:String,
 scheduleLink:String,
 bio:String,
 payments:Array
});

const careProvider = mongoose.model('careproviders', careProviders);

module.exports = careProvider;