const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const careprovider=require("../models/careprovider");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const superadmin=require("../models/superadmin");
const upload=require("../uploadsystem/uplod");
const { compareSync, hashSync } =require("bcrypt");
const member=require("../models/members");
const administrator = require("../models/administrators");
const event = require("../models/events");
const review = require("../models/reviews");

const stripe = require('stripe')('sk_test_51NW200FWCeACHFzezhRvEtteg8Qs3sVoVc1oUrHPREWNAnFxpPDJG8SAcjxlyZGLDGNBh3K1copbsHb7hPKTXrq3006VDfZMVO');

const transporter = nodemailer.createTransport({
    service:"gmail",
    port: 465,
    secure:false,
    auth: {
        user: process.env.app_user,
        pass:  process.env.app_pass,
    },
   
});
router.post("/updatepassword",async(req,res)=>{
    const { old, newP } = req.body;
    const memberId = req.body.memberId;
    const m = await member.findById(memberId);
    console.log("hi");
    const isValidPassword=await bcrypt.compare(old,m.password);
    if (!isValidPassword) {
      res.status(400);
       res.json({ message: "Bad credential" });
    }
    let saltRounds = 10;
    m.password = await bcrypt.hash(newP, saltRounds);
    await m.save();
     res.json({ message: "success" });
});

router.post("/createmember",async(req,res)=>{
    let saltRounds = 10;
    let company=await administrator.findOne({_id:req.body.companyId});
    req.body.companyName=company.companyName;
    req.body.hours=company.subscription===4?10:5;
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password=hashedPassword;
    req.body.onboardDate=new Date().toLocaleDateString();
    req.body.valid=new Date(dateStart).toLocaleDateString();
    const newMember = await member.create(req.body);
    const members=await administrator.findOne({_id:req.body.companyId});
    console.log(members);
   
    let allMembers=members.members;
    members.members.forEach((element,index) => {
        if(req.body.email===element.email)
        {
            allMembers[index].status="active";
        }

    });
    let update=await administrator.updateOne({_id:req.body.companyId},{members:allMembers});
    res.json({
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        email: newMember.email,
        _id: newMember._id,
      });
});
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const getMember=await member.findOne({email:req.body.email});
    if(getMember){
    const passwordMatch=await bcrypt.compare(password,getMember.password);
    if(passwordMatch)
    res.send(getMember);
    else
    res.status(400).send("Wrong");   
 }
 else
 res.status(400).send("Wrong");   

})
router.put("/updateprofile",upload.single("images"),async(req,res)=>{
    let images="";
    const updatedProfile={  dob:req.body.dob,
        country:req.body.country,languages:req.body.languages.split(","),};
   if(req.file){
    images=req.file.filename;
    updatedProfile.images=images;   
}
console.log(updatedProfile)
    member.updateOne({email:req.body.email},updatedProfile).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No care provider found"))
});


router.post("/checkemail",async(req,res)=>{
    const members=await administrator.findOne({_id:req.body.companyId});
    console.log(members)
    let userExists=false;
    members.members.forEach(element => {
        if(req.body.email===element.email)
        {
            userExists=true;
        }
    });
    if(userExists){
    member.findOne({email:req.body.email}).then(result=>{
        if(result)
        res.status(400).send("An account already exists with this email");
    else{
        const mailOptions = {
            from:process.env.app_user,
            to: `${req.body.email}`,
            subject: 'OTP to verify',
           
            html: ` <div style=" width: 85%;margin: 20px auto;">
            <img src="https://i.ibb.co/p0yYJHF/satori-logo-full.png" alt="satori-logo-full" style="display:block; border:0; width: 200px;margin: 20px auto;" />
             <p style="font-size:18px;text-align: center;">Use the following OTP to verify your Satori Account: </p>
             <p style="font-size:28px;text-align: center; font-weight: 900;">${req.body.otp} </p>
         <p style="font-size:18px;text-align: center;margin-top: 20px;">If you didn't request this, please ignore it or let us know</p>
        
          </div>`,
        
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email: ' + error);
              res.status(400).send("Something wrong happened!Try Again")
           
            } else {
              console.log('Email sent: ' + info.response);
              res.send("Email Sent")
            
            }
          });
    }
    }).catch(err=>{
        res.status(400).send(err);
    })}
    else
    res.status(400).send("No such company exists or no email");
    
});

router.get("/profile",async(req,res)=>{
   const result= await member.findOne({_id:req.query.id});
   res.send(result);
//     const allevents= await req.find({email:result.email});
//     var axios = require("axios").default;

//     let options = {
//       method: 'GET',
//       url: 'https://api.calendly.com/organizations/94f0e49d-92ac-4f34-90a4-0ebb3cee18cd/invitations',
//       params: {count: '100'},
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTczMzMwLCJqdGkiOiI2YjY4NjkxMC01NTJlLTQ2YjItOWViMC00ZDQ1MThhMmRhNjEiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.HmptWNKpuoh3Hp0cSCNr2RS-4UEFijrhw4Yy9BZU1d2YkM8b8P_CX8UgonklwT1q-d9RS0Aq-MP4FkKZfzRk_Q'
//       }
//     };
    
//    const data= await axios.request(options);

//    let uri="";
//    data.forEach(element=>{
//     if(element.email===result.email)
//     {
//         uri=element.user
       
//     }
//    })
//     options = {
//     method: 'GET',
//     url: 'https://api.calendly.com/scheduled_events',
//     params: {
//       user: 'https://api.calendly.com/users/62d6b129-f53d-4367-b07a-0d88d048274d',
//       organization: 'https://api.calendly.com/organizations/94f0e49d-92ac-4f34-90a4-0ebb3cee18cd',
//       status: 'active',
//       min_start_time: 'Sun Sep 10 2023 09:42:35 GMT+0600 (Bangladesh Standard Time) {}',
//       count: '100'
//     },
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTczMzMwLCJqdGkiOiI2YjY4NjkxMC01NTJlLTQ2YjItOWViMC00ZDQ1MThhMmRhNjEiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.HmptWNKpuoh3Hp0cSCNr2RS-4UEFijrhw4Yy9BZU1d2YkM8b8P_CX8UgonklwT1q-d9RS0Aq-MP4FkKZfzRk_Q'
//     }
//   };
  
//   axios.request(options).then(function (response) {
//     console.log(response.data);
//   }).catch(function (error) {
//     console.error(error);
//   });

});

router.post("/scheduleevent",async(req,res)=>{
    const member1=await   member.findOne({_id:req.body.id});
    let hours =parseFloat(member1.hours);
     hours-=0.5;
    const result= await new event({event:req.body.event,invitee:req.body.invitee,email:req.body.email,id:req.body.id,confirmed:req.body.confirmed,careProviderId:req.body.careProviderId,careProviderName:req.body.careProviderName,careProviderImage:req.body.careProviderImage,show:true,reviewed:false,complete:false,noShow:false,name:member1.firstName+" "+member1.lastName,dob:member1.dob}).save();
    const update=await member.updateOne({_id:req.body.id},{
        hours
    });
    res.send(result);
})
router.post("/rescheduleevent",async(req,res)=>{
    const member1=await   member.findOne({_id:req.body.id});

    var axios = require("axios").default;
    console.log(req.body.event)
    let uuid="";
    let url=req.body.event;
    for(let i=url.length-1;i>=0;i--)
    {
        if(url[i]==="/")
        break;
        uuid+=url[i];
    }
var options = {
  method: 'GET',
  url: `https://api.calendly.com/scheduled_events/${uuid.split("").reverse().join("")}`,
  headers: {'Content-Type': 'application/json',  Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTczMzMwLCJqdGkiOiI2YjY4NjkxMC01NTJlLTQ2YjItOWViMC00ZDQ1MThhMmRhNjEiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.HmptWNKpuoh3Hp0cSCNr2RS-4UEFijrhw4Yy9BZU1d2YkM8b8P_CX8UgonklwT1q-d9RS0Aq-MP4FkKZfzRk_Q'
}
};

axios.request(options).then(function (response) {
    req.body.events=response.data;
    const result=  new event({event:req.body.event,invitee:req.body.invitee,email:req.body.email,id:req.body.id,confirmed:req.body.confirmed,careProviderId:req.body.careProviderId,careProviderName:req.body.careProviderName,careProviderImage:req.body.careProviderImage,show:true,start_time:req.body.events.resource.start_time,
        meetingLink:req.body.events.resource.location.join_url,userUri:req.body.events.resource.event_memberships[0].user,eventID:req.body.events.resource.event_type,reviewed:false,complete:false,noShow:false,name:member1.firstName+" "+member1.lastName,dob:member1.dob}).save().then(result=>res.send(result)).catch(err=>res.send(err))
})
});
    
router.get("/getevent",async(req,res)=>{
    var axios = require("axios").default;
    console.log(req.query.uuid)
    let uuid="";
    let url=req.query.uuid;
    for(let i=url.length-1;i>=0;i--)
    {
        if(url[i]==="/")
        break;
        uuid+=url[i];
    }
var options = {
  method: 'GET',
  url: `https://api.calendly.com/scheduled_events/${uuid.split("").reverse().join("")}`,
  headers: {'Content-Type': 'application/json',  Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTczMzMwLCJqdGkiOiI2YjY4NjkxMC01NTJlLTQ2YjItOWViMC00ZDQ1MThhMmRhNjEiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.HmptWNKpuoh3Hp0cSCNr2RS-4UEFijrhw4Yy9BZU1d2YkM8b8P_CX8UgonklwT1q-d9RS0Aq-MP4FkKZfzRk_Q'
}
};

axios.request(options).then(function (response) {
  res.send(response.data);
}).catch(function (error) {
 res.status(400).send(error)
});
});
router.get("/getuserevent",async(req,res)=>{
event.findOne({_id:req.query.id}).then(e=>res.send(e)).catch(err=>res.send(err))
});

router.get("/userevents",async(req,res)=>{
    const events=await event.find({id:req.query.id,confirmed:true});
    const upcomingAppoints=[];
    const pastAppoints=[];
    events.forEach((e)=>{
        if(new Date().getTime()<new Date(e.start_time).getTime()){
            upcomingAppoints.push(e)
           
        }
        else
        pastAppoints.push(e)
    })
    res.send({upcomingAppoints,pastAppoints});
})

router.post("/cancelevent",async(req,res)=>{
   const events=await event.find({confirmed:false,id:req.body.id});
   console.log(events);
events.forEach(element=>{
    let uuid="";
    let url=element.event;
    var axios = require("axios").default;
     console.log(url)
    for(let i=url.length-1;i>=0;i--)
    {
        if(url[i]==="/")
        break;
        uuid+=url[i];
    }
    var options = {
        method: 'POST',
        url: `https://api.calendly.com/scheduled_events/${uuid.split("").reverse().join("")}/cancellation`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTczMzMwLCJqdGkiOiI2YjY4NjkxMC01NTJlLTQ2YjItOWViMC00ZDQ1MThhMmRhNjEiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.HmptWNKpuoh3Hp0cSCNr2RS-4UEFijrhw4Yy9BZU1d2YkM8b8P_CX8UgonklwT1q-d9RS0Aq-MP4FkKZfzRk_Q'
        },
        data: {reason: 'string'}
      };
      
      axios.request(options).then(function (response) {
        event.deleteOne({event:url}).then(ress=>console.log(res)).catch(err=>console.log(err))
      }).catch(function (error) {
          console.log(error)
      });
})
res.send("Success")
})
router.put("/updateevent",async(req,res)=>{
    const member1=await   member.findOne({_id:req.body.id});
   console.log(req.body.events)
  const updated=await  event.updateOne({event:req.body.event,},{
        confirmed:true,notes:req.body.notes,start_time:req.body.events.resource.start_time,
        meetingLink:req.body.events.resource.location.join_url,userUri:req.body.events.resource.event_memberships[0].user,eventID:req.body.events.resource.event_type
    })
    res.send(updated);
})
router.post("/usercancel",async(req,res)=>{
    let element=req.body;
    let uuid="";
    let url=element.event;
    var axios = require("axios").default;
     console.log(url)
    for(let i=url.length-1;i>=0;i--)
    {
        if(url[i]==="/")
        break;
        uuid+=url[i];
    }
    var options = {
        method: 'POST',
        url: `https://api.calendly.com/scheduled_events/${uuid.split("").reverse().join("")}/cancellation`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTczMzMwLCJqdGkiOiI2YjY4NjkxMC01NTJlLTQ2YjItOWViMC00ZDQ1MThhMmRhNjEiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.HmptWNKpuoh3Hp0cSCNr2RS-4UEFijrhw4Yy9BZU1d2YkM8b8P_CX8UgonklwT1q-d9RS0Aq-MP4FkKZfzRk_Q'
        },
        data: {reason: 'string'}
      };
      
      axios.request(options).then(async function (response) {
        const members=await member.findOne({_id:req.body.memberId});
        console.log(members);

        let hours=parseFloat(members.hours);
        if(req.body.type!=="reschedule")
        hours+=0.5;
        await member.updateOne({_id:req.body.memberId},{hours:hours});
         event.deleteOne({event:url}).then(res1=>res.send("Success")).catch(err=>console.log(err));
      }).catch(function (error) {
          console.log(error)
      });
})

router.get("/getcareproviders",async(req,res)=>{
    const events=await event.find({id:req.query.id,show:true});

  const allcareproviders=[];
   events.forEach(async(eve,index)=>{
       const care= await careprovider.findOne({_id:eve.careProviderId});
 allcareproviders.push(care)
 if(index===events.length-1){
    const resArr=[];
    allcareproviders.filter(function(item){
        var i = resArr.findIndex(x => (x.name == item.name ));
        if(i <= -1){
              resArr.push(item);
        }
        return null;
      });
 res.send(resArr)}
    }) 
    // setTimeout(()=>{ res.send(allcareproviders)},2000)
   
})
router.put("/unmatch",async(req,res)=>{
   const result=await event.updateMany({id:req.body.memberId,careProviderId:req.body.careId},{
        show:false
    });
    res.send(result)
})
router.post("/createreview",async(req,res)=>{

    await event.updateOne({_id:req.body.eventId},{reviewed:true});
    new review(req.body).save().then(result=>res.send(result)).catch(err=>res.send(err))
});

router.post('/pay', async (req, res) => {
  
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 400,
        currency: 'usd',
        metadata: {integration_check: 'accept_a_payment'},
        automatic_payment_methods: {enabled: true}

      });
  
      res.json({'client_secret': paymentIntent['client_secret']})
  });
  
module.exports=router;