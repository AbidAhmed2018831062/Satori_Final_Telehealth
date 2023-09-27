import { Box, Stack } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import visa from "../../../assets/images/visa.png";
import master from "../../../assets/images/master.png";
import amer from "../../../assets/images/amer.jpg";
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import numberWithCommas from '../../../assets/js/formatNumber';
function BillingandPaymentDetails({profile,selectedPlan,paymentMethod,add})
{

return(
    <Box sx={{flex:1,marginTop:"90px"}}>
    {Cookies.get("subscription")>0&&Object.keys(profile).length>0&&<div style={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",paddingTop:"20px",paddingBottom:"0px"}}>
<p style={{fontSize:'20px',textAlign:"start",fontWeight:"bold",marginBottom:"20px",padding:"0px 20px"}}>Upcoming Billing</p>
<p style={{fontSize:'16px',textAlign:"start",marginBottom:"0px",padding:"0px 20px"}}>Choosen Plan</p>

<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"5px",marginTop:"0px",padding:"0px 20px"}}>
<p style={{fontSize:'16px',textAlign:"start"}}>{selectedPlan.title}</p>
<p style={{fontSize:'16px'}}>IDR {numberWithCommas(selectedPlan.price*1000)}</p>
</div>
<p style={{fontSize:'16px',textAlign:"start",marginBottom:"0px",padding:"0px 20px"}}>Members</p>

<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"5px",marginTop:"0px",padding:"0px 20px"}}>
<p style={{fontSize:'16px'}}>{profile.slots+profile.members.length}</p>
<p style={{fontSize:'16px'}}>x{profile.slots+profile.members.length}</p>
</div>
<div style={{width:"100%",backgroundColor:"#011F1E",height:"1px"}}></div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',padding:"0px 20px"}}>
<p style={{fontSize:'16px'}}>Total Payments</p>
<p style={{fontSize:'16px',fontWeight:"bold"}}>{numberWithCommas((profile.slots+profile.members.length)*(parseFloat(selectedPlan.price)*1000))}</p>
</div>
<div style={{backgroundColor:"rgba(226, 241, 214, 1)",borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px",padding:"10px"}}>
<p style={{fontSize:'16px'}}>Auto Pay On {add}</p>
</div>
</div>}
<p style={{marginTop:"30px",marginBottom:"10px",fontSize:"20px",fontWeight:"bold"}}>Payment Details</p>
    {paymentMethod.map(pay=>{
        return(  <Box key={pay}id="oldcard" sx={{borderRadius: "20px",paddingLeft:"20px",display:"flex",
        border: "1px solid #000",marginTop:"10px",textAlign:"start",alignItems:'center'}}>
            
            <img src={pay.card.brand==="visa"?visa:pay.card.brand.includes("aster")?master:pay.card.brand.includes("amer")?amer:""} style={{width:"30px",height:"30px",marginRight:"10px"}}/>
            <p style={{color:"var(--primary-dark, #011F1E)",alignItems:'center',
        fontFamily: "Nunito",
        fontSize: "20px",
        fontStyle: "underline",
        fontWeight: 400,
        textAlign:"end",
        cursor:"pointer",
        lineHeight: "normal"}}>XXXX XXXX XXXX {pay.card.last4}</p>
        <div >
        </div></Box>)
    })}

</Box>
)
}

export default BillingandPaymentDetails;