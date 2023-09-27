const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const superadmin = new Schema({
   email:{
    require:true,
     type:String,
   },
   password:{
      require:true,
       type:String,
   },
   sponsoredhours:Number,
   totalMembers:Number,
   totalProviders:Number,
   totalAdmins:Number,
   hoursUsed:Number,
   slotsPurchased:Number,
//    dateStart:String,
//    slots:Number,
//    images:String,
//    cancelled:Boolean
});

const superadmins = mongoose.model('superadmins', superadmin);

module.exports = superadmins;