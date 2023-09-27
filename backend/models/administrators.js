const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administrators = new Schema({
   email:{
    require:true,
     type:String,
   },
   password:{
      require:true,
       type:String,
   },
   companyName:String,
   phone:String,
   subscription:Number,
   members:Array,
   paymentInfo:Array,
   dateStart:String,
   slots:Number,
   images:String,
   cancelled:Boolean,
   calendlyToken:String,
   organizationURI:String,
});

const administrator = mongoose.model('administrators', administrators);

module.exports = administrator;