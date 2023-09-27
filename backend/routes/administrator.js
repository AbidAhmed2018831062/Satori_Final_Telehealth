const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const admin=require("../models/administrators");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const superadmin=require("../models/superadmin");
const upload=require("../uploadsystem/uplod");
// const transporter = nodemailer.createTransport({
//     service:"smtp",
//     host: 'mail.talkwithsatori.com',
//     port: 465,
//     secure:"false",
//     auth: {
//         user: process.env.app_user,
//         pass:  process.env.app_pass,
//     },
   
// });
const transporter = nodemailer.createTransport({
    service:"gmail",
    port: 465,
    secure:false,
    auth: {
        user: process.env.app_user,
        pass:  process.env.app_pass,
    },
   
});
  router.post("/createadminsitrator",async(req,res)=>{

    const {email,password,companyName,phone,}=req.body;
    let saltRounds = 10;
let hashedPassword = await bcrypt.hash(password, saltRounds);
    admin.findOne({email}).then(result=>{
        if(result)
        res.status(400).send("An account already exists with this email");
    else{
        let newAdmin=new admin();
        newAdmin.companyName = companyName;
        newAdmin.email = email;
        newAdmin.password=hashedPassword
        newAdmin.subscription=-1;
        newAdmin.phone=phone;
        newAdmin.dateStart=new Date().toLocaleDateString();
        newAdmin.save().then(createdAdmin=>{
          res.send(createdAdmin);

        }).catch(err=>{
            res.status(400).send(err);
            
        })
    }
    }).catch(err=>{
        res.status(400).send(err);
    })
});

router.get("/profile",async(req,res)=>{
    admin.findOne({_id:req.query.id}).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No admin found"))
})
router.put("/updatepaymentinfo",async(req,res)=>{
    admin.updateOne({_id:req.body.id},{
        paymentInfo:req.body.paymentInfo,
        subscription:req.body.subs,
        dateStart:new Date().toLocaleDateString()
    }).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No admin found"))
})
router.put("/editprofile",upload.single("images"),async(req,res)=>{
    let images="";
    const updatedProfile={  companyName:req.body.companyName,
        phone:req.body.phone,};
   if(req.file){
    images=req.file.filename;
    updatedProfile.images=images;   
}
    admin.updateOne({email:req.body.email},updatedProfile).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No admin found"))
});

router.post("/sendinvitations",async(req,res)=>{
    const {emails}=req.body;
    console.log(req.body);
    const user=await admin.findOne({_id:req.body.id});
    
    const members=user.members;
    emails.forEach(element=>{
        members.push({email:element.email,startDate:new Date().toLocaleDateString(),status:"invited",error:false})
    })
    emails.forEach(element => {
        const mailOptions = {
            from:process.env.app_user,
            to: `${element.email}`,
            subject: 'Invitation Link to Join Satori',
            text: `Use this url to join the Satori website: ${element.url}`,
            html: `<div style=" width: 85%;margin: 20px auto;">
            <img src="https://i.ibb.co/p0yYJHF/satori-logo-full.png" alt="satori-logo-full" style="display:block; border:0; width: 200px;margin: 20px auto;" />
            <h3 style="font-size: 35px;margin:0px; margin-bottom: 10px;font-family: Nunito;text-align: center;">Welcome To Satori</h3>
             <p style="font-size:18px;text-align: center;">You are invited to join <span style="font-weight: bold;">${user.companyName}</span> on Satori. Create your account to access<br> counselling with licensed care providers and mental health resources for free.</p>
         <img src="https://i.ibb.co/2SsbVQN/undraw-Dreamer-re-9tua.png" alt="undraw-Dreamer-re-9tua"style="border:0;display:block;width:600px;margin:20px auto;">
              <a href="${element.url}" style="text-align:center; display:block; width:100px;margin: 20px auto; padding:15px 30px; background: var(--primary-color, #62C227); font-weight: bold; color: white;text-decoration: none;">Register Now</a>
            
          </div>`,
       
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email: ' + error);
           
            } else {
              console.log('Email sent: ' + info.response);
            
            }
          });
    });
    res.send("Successfully Sent");
     admin.updateOne({_id:req.body.id},{
  members
    }).then(foundedAdmin=>console.log(foundedAdmin)).catch(err=>console.log(err))
});

router.post("/checkemail",async(req,res)=>{
    admin.findOne({email:req.body.email}).then(result=>{
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
    })
    
})


router.post("/sendinvite",async(req,res)=>{
    console.log(req.body.email);
    const user=await admin.findOne({_id:req.body.id});

    const mailOptions = {
        from:process.env.app_user,
        to: `${req.body.email}`,
        subject: 'Invitation Link to Join Satori',
        text: `Use this url to join the Satori website: ${req.body.url}`,
        html: `<div style=" width: 85%;margin: 20px auto;">
        <img src="https://i.ibb.co/p0yYJHF/satori-logo-full.png" alt="satori-logo-full" style="display:block; border:0; width: 200px;margin: 20px auto;" />
        <h3 style="font-size: 35px;margin:0px; margin-bottom: 10px;font-family: Nunito;text-align: center;">Welcome To Satori</h3>
         <p style="font-size:18px;text-align: center;">You are invited to join <span style="font-weight: bold;">${user.companyName}</span> on Satori. Create your account to access<br> counselling with licensed care providers and mental health resources for free.</p>
     <img src="https://i.ibb.co/2SsbVQN/undraw-Dreamer-re-9tua.png" alt="undraw-Dreamer-re-9tua"style="border:0;display:block;width:600px;margin:20px auto;">
          <a href="${req.body.url}" style="text-align:center; display:block; width:100px;margin: 20px auto; padding:15px 30px; background: var(--primary-color, #62C227); font-weight: bold; color: white;text-decoration: none;">Register Now</a>
        
      </div>`,
   
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email: ' + error);
       
        } else {
          console.log('Email sent: ' + info.response);
        
        }
      });
})

router.put("/updateslots",async(req,res)=>{
    const profile2=await admin.findOne({_id:req.body.id});
    console.log(profile2);
    const profile=await admin.updateOne({_id:req.body.id},{slots:profile2.slots+parseInt(req.body.slots)});
res.send("successful");
});
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const administratorUser=await admin.findOne({email:req.body.email});
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
router.put("/updatepassword",async(req,res)=>{
    console.log(req.body);
  const {old,newP,id}=req.body;
  const user=await admin.findOne({_id:id});
  const passwordMatch=await bcrypt.compare(old,user.password);
  console.log(passwordMatch)
  if(passwordMatch)
  {
    let hashedPassword = await bcrypt.hash(newP, 10);
    const updated=await admin.updateOne({_id:id},{
        password:hashedPassword
    });
    if(updated)
    res.send("Successfully Updated");
else 
res.status(400).send("Failed to update password");

  }
  else
  res.status(400).send("Old password is not correct");
});

router.put("/removeuser",async(req,res)=>{
    const user=await admin.findOne({_id:req.body.id});
    const members=user.members;
    console.log(user);
    members.forEach((e,index)=>{
        if(e.email===req.body.email)
        members.splice(index,1);
    })
   const result=await admin.updateOne({_id:req.body.id},{
        members
    });
    res.send(result);
})
module.exports=router;