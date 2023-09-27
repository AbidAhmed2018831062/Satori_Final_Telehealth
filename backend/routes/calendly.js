const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const superadmin=require("../models/superadmin");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const admin=require("../models/administrators");
const members=require("../models/members");
const axios = require('axios');
const careProvider=require("../models/careprovider")
const invoice=require("../models/invoices");
const stripe = require('stripe')('sk_test_51NW200FWCeACHFzezhRvEtteg8Qs3sVoVc1oUrHPREWNAnFxpPDJG8SAcjxlyZGLDGNBh3K1copbsHb7hPKTXrq3006VDfZMVO');
const upload=require("../uploadsystem/uplod");

router.get("/allevents",async(req,res)=>{
    var options = {
        method: 'GET',
        url: 'https://api.calendly.com/scheduled_events',
        params: {
          organization: 'https://api.calendly.com/organizations/94f0e49d-92ac-4f34-90a4-0ebb3cee18cd'
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTczMzMwLCJqdGkiOiI2YjY4NjkxMC01NTJlLTQ2YjItOWViMC00ZDQ1MThhMmRhNjEiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.HmptWNKpuoh3Hp0cSCNr2RS-4UEFijrhw4Yy9BZU1d2YkM8b8P_CX8UgonklwT1q-d9RS0Aq-MP4FkKZfzRk_Q'
        }
      };
      
      axios.request(options).then(function (response) {
      res.send(response.data);
      }).catch(function (error) {
        res.send(error);
      });
});
router.get("/userevents",async(req,res)=>{
    var options = {
        method: 'GET',
        url: 'https://api.calendly.com/scheduled_events',
        params: {
          organization: 'https://api.calendly.com/organizations/94f0e49d-92ac-4f34-90a4-0ebb3cee18cd'
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTczMzMwLCJqdGkiOiI2YjY4NjkxMC01NTJlLTQ2YjItOWViMC00ZDQ1MThhMmRhNjEiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.HmptWNKpuoh3Hp0cSCNr2RS-4UEFijrhw4Yy9BZU1d2YkM8b8P_CX8UgonklwT1q-d9RS0Aq-MP4FkKZfzRk_Q'
        }
      };
      
      axios.request(options).then(function (response) {
    //   res.send(response.data);
    const events=[];
    console.log(response.data.collection)
    response.data.collection.forEach(element => {
        console.log(element.event_memberships)
         if(element.event_memberships[0].user_email===req.query.email)
         events.push(element);
    });
    res.send(events)
      }).catch(function (error) {
        res.send(error);
      });
});


module.exports=router;