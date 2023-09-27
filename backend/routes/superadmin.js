const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const superadmin=require("../models/superadmin");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const admin=require("../models/administrators");
const members=require("../models/members");
const event=require("../models/events.js");
const axios = require('axios');
const careProvider=require("../models/careprovider")
const invoice=require("../models/invoices");
const stripe = require('stripe')('sk_test_51NW200FWCeACHFzezhRvEtteg8Qs3sVoVc1oUrHPREWNAnFxpPDJG8SAcjxlyZGLDGNBh3K1copbsHb7hPKTXrq3006VDfZMVO');
const upload=require("../uploadsystem/uplod")
//   router.post("/createsuperadmin",async(req,res)=>{

//     const {email,password}=req.body;
//     let saltRounds = 10;
// let hashedPassword = await bcrypt.hash(password, saltRounds);
//     superadmin.findOne({email}).then(result=>{
//         if(result)
//         res.status(400).send("An account already exists with this email");
//     else{
//         let newAdmin=new superadmin();

//         newAdmin.email = email;
//         newAdmin.password=hashedPassword
    
//         newAdmin.save().then(createdAdmin=>{
//           res.send(createdAdmin)
//         }).catch(err=>{
//             res.status(400).send(err);
//         })
//     }
//     }).catch(err=>{
//         res.status(400).send(err);
//     })
// });

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const administratorUser=await superadmin.findOne({email:req.body.email});
    if(administratorUser){
    const passwordMatch=await bcrypt.compare(password,administratorUser.password);
    if(passwordMatch)
    res.send(administratorUser);
    else
    res.status(400).send("Wrong");   
 }
 else
 res.status(400).send("Wrong");   

})
router.get("/getcount",async(req,res)=>{
   const admnins=await admin.find({});
   const totalAdminCount=await admin.find({}).count();
   let totalMembers=0;
   let totalSlots=0;
   let totalSponsoredHours=0;
   admnins.forEach((e)=>{
    totalMembers+=e.members.length;
    if(e.slots){
    totalSponsoredHours+=(e.slots+e.members.length)*(e.subscription===1?19:5);
    totalSlots+=e.slots+e.members.length;
    }
   });
  res.send({totalAdmin:totalAdminCount,totalMembers,totalSlots,totalSponsoredHours,careProviders:0,hoursCom:0});

});
const apiKey = 'aC4aXBtbmHGh23phMMnrttd6AX26XbTJv_k8Gdxbnzk';
const apiSecret = 'wQm6Csmc6SrSsaFnj8MKn4JFfyE0XmnUS8VX2j07PIs';
const axiosInstance = axios.create({
  baseURL: 'https://calendly.com/api/v1',
  auth: {
    username: apiKey,
    password: apiSecret,
  },
});
router.get('/user', async (req, res) => {
  try {
    const response = await axiosInstance.get('/users/me');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.get("/getadministrators",async(req,res)=>{
    const admnins=await admin.find({});
  
   res.send(admnins);
 
 });
 router.get("/allemails",async(req,res)=>{
  const user=await admin.find({});
  const allEmails=[];
  Array.from(user).forEach(us=>{
    allEmails.push(us.email);
  });
  res.send(allEmails);
 })
 router.post("/createinvoice",async(req,res)=>{
  const {name,hours,total,email,adminId,status,notes}=req.body;
  const paymentDetails=await admin.findOne({email:email})
  const invoice2 = await stripe.invoices.create({
    customer:  paymentDetails.paymentInfo[0].customer,
    collection_method: 'send_invoice',
    days_until_due: 30,
    currency:"IDR",
  });
  const invoiceItem = await stripe.invoiceItems.create({
    customer:   paymentDetails.paymentInfo[0].customer,
    amount: total,
    currency: 'IDR',
    invoice:invoice2.id
  });
  const invoice3 = await stripe.invoices.finalizeInvoice
(invoice2.id);
const invoice4 = await stripe.invoices.sendInvoice
(invoice2.id);
  new invoice({
    invoiceId:invoice2.id, name,hours,total,email,adminId,status,notes,created:new Date().toLocaleDateString(),
  }).save().then(result=>{
    res.send({invoiceItem,result})
  })
 });

 router.get("/allinvoices",async(req,res)=>{
  const allInvoices= await invoice.find({});
  console.log(allInvoices)
  res.send(allInvoices)
 })

 router.get("/allmembers",async(req,res)=>{
  const allMembers= await members.find({});
  console.log(allMembers)
  res.send(allMembers)
 })
 router.get("/allcareproviders",async(req,res)=>{
  const allcareproviders= await careProvider.find({});
  console.log(allcareproviders)
  res.send(allcareproviders)
 })
 router.put("/update",async(req,res)=>{
  const updated= await invoice.updateOne({invoiceId:req.body.invoiceId},{
    status:req.body.status
  });

  res.send(updated)
 })

 router.get("/getevents",async(req,res)=>{
  const allMembers= await event.find({});
  console.log(allMembers)
  res.send(allMembers)
 })
module.exports=router;