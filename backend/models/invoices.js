const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoices = new Schema({
  adminId:String,
  invoiceId:String,
  hours:Number,
  total:Number,
  created:String,
  name:String,
  status:String,
  notes:String,
  email:String,
  customerId:String
});

const invoice = mongoose.model('invoices', invoices);

module.exports = invoice;