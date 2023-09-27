
const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const admin=require("../models/administrators");
const { route } = require("./superadmin");
const stripe = require('stripe')('sk_test_51NW200FWCeACHFzezhRvEtteg8Qs3sVoVc1oUrHPREWNAnFxpPDJG8SAcjxlyZGLDGNBh3K1copbsHb7hPKTXrq3006VDfZMVO');
router.post('/sub', async (req, res) => {
    const {email, payment_method,name,
        country,} = req.body;
     const user=await admin.findOne({_id:req.body.id});

  console.log(req.body.planId);
    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: user.email,
      name,
      invoice_settings: {
        default_payment_method: payment_method,
      },
    });
  
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price:req.body.planId}],
      expand: ['latest_invoice.payment_intent']
    });
    console.log(subscription['latest_invoice']);
    if(subscription['latest_invoice']['payment_intent']){
    const status = subscription['latest_invoice']['payment_intent']['status'] 
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
  
    res.json({'client_secret': client_secret, 'status': status,id:subscription['latest_invoice']});
    }
    else
    res.json({id:subscription['latest_invoice'],status:"Free Plan"})
  });

router.get("/plans",async(req,res)=>{
    const products = await stripe.products.list({
        limit: 4,
      });
    
    res.send(products);
});

router.get("/createpayment",async(req,res)=>{

});

router.get("/lastmethod",async(req,res)=>{

  const paymentDetails= await admin.findOne({_id:req.query.id});
  console.log(paymentDetails.paymentInfo[0].customer)
    const paymentMethods =  await stripe.paymentMethods.list({
      customer:paymentDetails.paymentInfo[0].customer,
      type: 'card',
    });
    res.send(paymentMethods);
});

router.put("/updatemethod",async(req,res)=>{
 
  try{
 
  const paymentDetails= await admin.findOne({_id:req.body.id});
  const paymentMethod1 = await stripe.paymentMethods.attach(
    req.body.payment_method,
    {customer:  paymentDetails.paymentInfo[0].customer}
  );
  res.send("Successful")
}
catch(e){
  console.log(e);
  res.status(400).send(e);
}
})
router.get("/getpaymentmethod",async(req,res)=>{
  const paymentDetails= await admin.findOne({_id:req.query.id});
  console.log(paymentDetails.paymentInfo[0].customer)
    const paymentMethods =  await stripe.paymentMethods.list({
      customer:paymentDetails.paymentInfo[0].customer,
      type: 'card',
    });
    res.send(paymentMethods);


});
router.get("/invoices",async(req,res)=>{
  try{
  const paymentDetails= await admin.findOne({_id:req.query.id});

  const invoices = await stripe.invoices.list({
   
  });
  let customerInvo=[];
  invoices.data.forEach((e,i)=>{
    if(e.customer=== paymentDetails.paymentInfo[0].customer)
    customerInvo.push(e);
  })
  res.send(customerInvo);
}
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
  })
router.post('/pay', async (req, res) => {
  const {email} = req.body;
  const paymentDetails= await admin.findOne({_id:req.body.id});

  const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.price,
      currency: 'usd',
      automatic_payment_methods: {enabled: true},
      customer:paymentDetails.paymentInfo[0].customer,
   
      // Verify your integration in this guide by including this parameter
      receipt_email: email,
     
    });

    res.json({'client_secret': paymentIntent['client_secret']})
});

router.post("/updatesub",async(req,res)=>{
  const paymentDetails= await admin.findOne({_id:req.body.id});
  const subscriptionItems = await stripe.subscriptionItems.list({
    subscription: paymentDetails.paymentInfo[0].subscription,
  });
  const subscription = await stripe.subscriptions.update(
    paymentDetails.paymentInfo[0].subscription,    {
      items: [
        {
          id:subscriptionItems.data[0].id,
          deleted: true,
        },
        {
        
        price: req.body.price,
        quantity:req.body.members
        },
      ],
    }
  );
  if(subscription){
 const result= await admin.updateOne({_id:req.body.id},{
  subscription:req.body.subs,
  dateStart:new Date().toLocaleDateString()
 })
  res.send(subscription)
  }
  else
  res.status(400).send("Could not update subscription");
});

router.post("/createinvoice",async(req,res)=>{
  const invoice = await stripe.invoices.create({
    customer:"cus_OYJdpc3btqyZ9t",
    collection_method: 'send_invoice',
    days_until_due: 30,
    currency:"USD",
  });
  const invoiceItem = await stripe.invoiceItems.create({
    customer: "cus_OYJdpc3btqyZ9t",
    amount: 1000,
    currency: 'usd',
  });
  res.send(invoiceItem)
})

router.delete("/cancel",async(req,res)=>{
  const paymentDetails= await admin.findOne({_id:req.query.id});
  const trimmed =  paymentDetails.paymentInfo[0].subscription.replace(/(\r\n|\n|\r)/gm, "");

  const subscription = await stripe.subscriptions.update(
    trimmed,
   {
      cancel_at_period_end: true,
    }
  );
  if(subscription)
  {
    console.log(subscription);
   const success= await admin.updateOne({_id:req.query.id},{
      cancelled:true,
      subscription:0
    });
    console.log(success);
    if(success)
    res.send("Successfully cancelled subscription");
  else
  res.status(400).send("Cancellation unsuccessful");
  }
  else
  res.status(400).send("Cancellation unsuccessful");

})



  module.exports=router;