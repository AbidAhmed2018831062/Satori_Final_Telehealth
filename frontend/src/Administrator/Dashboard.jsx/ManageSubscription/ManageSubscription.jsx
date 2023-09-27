import { Box, Stack } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import visa from "../../../assets/images/visa.png";
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { baseURL } from '../../../../config';
import BillingandPaymentDetails from './BillingandPaymentDetails';
import UpgradePlan from './UpgradePlan';
const stripePromise = loadStripe('pk_test_51NW200FWCeACHFzeNmRLaay10RsG9IEwlqP8VnEAsc5anhkITMoaLQYnsm4QWA5WhTcLih5JzkIObVSNia11hp1d00xj8iCGKH'
);

function ManageSubscription({profile})
{
    const [selectedPlan,setSelectedPlan]=useState({})
    const [add,setAdd]=useState(0);
    const [plans,setPlans]=useState([]);
    const [paymentMethod,setPaymentMethods]=useState([]);
    useEffect(()=>{
        axios.get(`${baseURL}/payment/plans`).then(res=>{
            console.log(res.data);
            const plan=[
                {
                    id:"price_1NcAQPFWCeACHFzebFdC6pRJ",
                    title:res.data.data[1].name,
                         price:0,
        duration:"3 months",
        desc:["5 sponsored hours per member","IDR 400K per appointment","Unlimited members"],
        active:res.data.data[1].active,
                },
                {
                    id:"price_1NcAOIFWCeACHFzeVx364XyS",
                    title:res.data.data[3].name,
                    price:"1499",
                    duration:"/member/year",
                    desc:["10 sponsored hours per member","IDR 400K per appointment","Unlimited members"],
                    active:res.data.data[3].active,
                },
                {
                    id:"price_1NcAOzFWCeACHFzedj8Sdvbz",
        title:res.data.data[2].name,
        price:"2499",
        duration:"/member/year",
        desc:["5 sponsored hours per member","Free Appointment","Unlimited members"],
        active:res.data.data[2].active,
    },
  
            ];
           console.log(Cookies.get("subscription"));
            const addToDate=Cookies.get("subscription")==="0"?3:12;
            setAdd(new Date(new Date().setMonth(new Date().getMonth()+addToDate)).getDate()+"/"+parseInt(new Date(new Date().setMonth(new Date().getMonth()+addToDate)).getMonth()+1)+"/"+new Date(new Date().setMonth(new Date().getMonth()+addToDate)).getFullYear())
            setPlans(plan);
            setSelectedPlan(plan[1])
        }).catch(err=>console.log(err));
    },[profile])
    useEffect(()=>{
        axios.get(`${baseURL}/payment/getpaymentmethod?id=${Cookies.get("id")}`).then(result=>{
            console.log(result);
            setPaymentMethods(result.data.data)
            console.log(result.data.data[0]);
        }).catch(err=>console.log(err))
    },[])
return(
    <div style={{paddingLeft:"20px"}}>
       {Object.keys(selectedPlan).length>0&& <Stack direction="row" sx={{gap:"30px",justifyContent:"space-between"}}>
        <Box sx={{flex:2}}>
        <h3 style={{marginTop:"20px",marginBottom:"20px",fontSize:"35px"}}>Manage Subscription</h3>
        <Box sx={{borderRadius: "20px",padding:"10px",
border: "1px solid #000"}}>
      <Stack direction="row" sx={{gap:"30px",justifyContent:"space-between"}}>
        <p style={{color:"var(--primary-dark, #011F1E)",
fontFamily: "Nunito",
fontSize: "20px",
fontStyle: "normal",
fontWeight: 600,
lineHeight: "normal"}}>Active Plan</p>
{profile.subscription!==0&&  <p style={{color:"var(--primary-dark, #011F1E)",
fontFamily: "Nunito",
fontSize: "20px",
fontStyle: "underline",
fontWeight: 600,
textAlign:"end",
cursor:"pointer",
lineHeight: "normal"}}><NavLink to="/admin/manage/cancel" style={{color:"black"}}>Cancel Subscription</NavLink></p>}
</Stack>
<h3 style={{marginTop:"20px",fontSize:"35px",marginBottom:"0px"}}>
{selectedPlan.title}
</h3>
{profile.subscription>0&&<p style={{fontSize:"35px",marginTop:"0px",marginBottom:"0px"}}>{profile.subscription===1?"IDR 1,499,000 / member / year":"IDR 2,499,000 / member / year"}</p>}
<p style={{fontSize:"20px",marginTop:"0px",fontWeight:400}}>with 20 members</p>
<p style={{color:"var(--primary-dark, #011F1E)",
fontFamily: "Nunito",
fontSize: "20px",
fontStyle: "normal",
fontWeight: 400,
marginTop:"50px",
marginBottom:"50px",
lineHeight: "normal"}}>Next Billing Date: {add}</p>
        </Box>
        <Box id="invitemoremmebers" sx={{borderRadius: "20px",padding:"10px",marginTop:"10px",
border: "1px solid #000"}}>
        <Stack direction="row" sx={{gap:"30px",justifyContent:"space-between"}}>
        <p style={{color:"var(--primary-dark, #011F1E)",
fontFamily: "Nunito",
fontSize: "20px",
fontStyle: "normal",
fontWeight: 400,
lineHeight: "normal"}}>Invite More Members</p>
 {profile.subscription!==0&& <p style={{color:"var(--primary-dark, #011F1E)",
fontFamily: "Nunito",
fontSize: "20px",
fontStyle: "underline",
fontWeight: 600,
textAlign:"end",
cursor:"pointer",
lineHeight: "normal"}}><NavLink to="/admin/manage/slots" style={{color:"#111"}}>Purchase Slots</NavLink></p>}
</Stack>
        </Box>
       <UpgradePlan plans={plans}selectedPlan={selectedPlan}profile={profile}/>
        </Box>
        <BillingandPaymentDetails selectedPlan={selectedPlan} profile={profile} paymentMethod={paymentMethod} add={add}/>
        </Stack>}
        
     
    </div>
)
}

export default ManageSubscription;