import React, { useEffect, useState } from 'react';
import logo from "../../../assets/images/logo.png"
import { Box, Radio, TextField } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useStripe, useElements, CardElement, Elements, CardNumberElement} from '@stripe/react-stripe-js';
import CardInput from '../../Payment/CardInput';
import { Cookie } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import CardShow from './CardShow';
import ShowPlanDetails from './ShowPlanDetails';
import AdminNavbar from '../AdminNavbar';
import { baseURL } from '../../../../config';
import numberWithCommas from '../../../assets/js/formatNumber';
function UpgradeAdminPlan({id})
{
    const [profile,setProfile]=useState({});
    const [selectedPlan,setSelectedPlan]=useState({})
    const [add,setAdd]=useState(0);
    const [updatedPlan,setUpdatedPlan]=useState();
    const [plans,setPlans]=useState([]);
    useEffect(()=>{
      
        axios.get(`${baseURL}/payment/plans`).then(res=>{
            console.log(res.data.data[0]);
            const plan=[
                {
                    id:"price_1NcAQPFWCeACHFzebFdC6pRJ",
                    itemId:res.data.data[1].id,
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
                    itemId:res.data.data[3].id,
                    duration:"/member/year",
                    desc:["10 sponsored hours per member","IDR 400K per appointment","Unlimited members"],
                    active:res.data.data[3].active,
                },
                {
                    id:"price_1NcAOzFWCeACHFzedj8Sdvbz",
        title:res.data.data[2].name,
        itemId:res.data.data[2].id,
        price:"2499",
        duration:"/member/year",
        desc:["5 sponsored hours per member","Free Appointment","Unlimited members"],
        active:res.data.data[2].active,
    },
  
            ];
            setUpdatedPlan(plan[id]);
            setAdd(Cookies.get("subscription")===0?3:12)
            setPlans(plan);
            setSelectedPlan(plan[Cookies.get("subscription")])
        }).catch(err=>console.log(err));
    },[id]);
    useEffect(()=>{
        axios.get(`${baseURL}/admin/profile?id=${Cookies.get("id")}`,).then(result=>{
            console.log(result.data);
            setProfile(result.data);
           
        }).catch(err=>console.log(err));
    },[]);
    const [name,setName]=useState("");
    const [paymentMethods,setPaymentMethods]=useState([]);
    const stripe = useStripe();
    const elements = useElements();
    const [navigate,setNavigate]=useState(false);
    useEffect(()=>{
        axios.get(`${baseURL}/payment/getpaymentmethod?id=${Cookies.get("id")}`).then(result=>{
            console.log(result);
            setPaymentMethods(result.data.data)
            console.log(result.data.data[0]);
        }).catch(err=>console.log(err))
    },[]);
    const [old,setOld]=useState('a');
    const handleChange1 = (event) => {
       setOld(event.target.value);
     };
     const updateSub=async()=>{
        // axios.post("http://localhost:5000/payment/updatesub",{
        //     members:profile.members.length+profile.slots,
        //     price:updatedPlan.id,
        //     id:Cookies.get("id")
        // }).then(result=>console.log(result)).catch(err=>console.log(err))
        // setTimeout(() => {
        //     Cookies.set("subscription",id,{expires:365})
        //     setNavigate(true);
        // }, 2000);
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
          }
      
          const res = await axios.post(`${baseURL}/payment/pay`, {id:Cookies.get("id"),email: "ahmedabid3409@gmail.com",price:updatedPlan.price*1000*(profile.members.length+profile.slots)-(profile.slots+profile.members.length)*(parseFloat(selectedPlan.price)*1000)});
      
          const clientSecret = res.data['client_secret'];
          let result;
          if(old==='a')
           result = await stripe.confirmCardPayment(clientSecret, {
            payment_method:paymentMethods[0].id
          });
          else
          result = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  email: "ahmedabid3409@gmail.com",
                  name:name
                },
              },
            });
      
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              console.log('Money is in the bank!');
     axios.post(`${baseURL}/payment/updatesub`,{
            members:profile.members.length+profile.slots,
            price:updatedPlan.id,
            id:Cookies.get("id"),
            subs:id,
            oldId:selectedPlan.itemId
        }).then(result=>{
            console.log(result)
        setNavigate(true)}).catch(err=>console.log(err))
            }
          }
     }
return(
    <div>
        <AdminNavbar/>
        {navigate&&<Navigate to="/admin"></Navigate>}
        {Object.keys(profile).length>0&&paymentMethods.length>0&&Object.keys(selectedPlan).length>0&&<div style={{width:"75%",margin:"30px auto",display:"flex",justifyContent:"space-between",gap:"20px"}}>
            <div style={{flex:2}}>
                <h3 style={{fontSize:"35px",fontWeight:700,marginTop:"30px",marginBottom:"30px",textAlign:"start"}}>Payment Details</h3>
        <CardShow name={name}setName={setName} paymentMethods={paymentMethods} old={old}handleChange1={handleChange1}/>
        </div>
        <div style={{flex:1}}>
        <h3 style={{fontSize:"35px",fontWeight:700,marginTop:"20px",marginBottom:"20px",textAlign:"start"}}>Summary</h3>
        <p style={{fontSize:"20px",marginTop:"20px",textAlign:"start"}}>Current Plan</p>
        <ShowPlanDetails selectedPlan={selectedPlan} profile={profile}/>
        <p style={{fontSize:"20px",marginTop:"20px",textAlign:"start"}}>New Plan:</p>
        <div style={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",padding:"20px"}}>
    <p style={{fontSize:"20px",marginTop:"20px",textAlign:"start"}}>{updatedPlan.title}</p>


<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"20px"}}>
    <p style={{fontSize:'16px',textAlign:"start"}}>/member/year</p>
    <p style={{fontSize:'16px'}}>IDR {numberWithCommas(updatedPlan.price*1000)}</p>
</div>
<p style={{fontSize:"20px",marginTop:"20px",textAlign:"start"}}>Member:</p>

<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"20px"}}>
    <p style={{fontSize:'16px',textAlign:"start"}}>{(profile.members.length+profile.slots)}</p>
    <p style={{fontSize:'16px'}}>IDR {numberWithCommas(updatedPlan.price*1000*(profile.members.length+profile.slots))}</p>
</div>
<div style={{width:"100%",backgroundColor:"#011F1E",height:"1px"}}></div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"10px",marginTop:"20px"}}>
    <p style={{fontSize:'16px'}}>Total</p>
    <p style={{fontSize:'16px'}}>IDR  {numberWithCommas(updatedPlan.price*1000*(profile.members.length+profile.slots))}</p>
</div>

</div>
<div style={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",padding:"20px",marginBottom:"20px",marginTop:"20px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"20px"}}>
    <p style={{fontSize:'16px',textAlign:"start"}}>Subtotal</p>
    <p style={{fontSize:'16px'}}> {numberWithCommas(updatedPlan.price*1000*(profile.members.length+profile.slots))}</p>
</div>
</div>
<button style={{display: "flex",
width: "100%",
height:" 50px",
backgroundColor:"rgba(98, 194, 39, 1)",
margin:"20px auto",
padding: "10px",
color:"white",
justifyContent:" center",
alignItems:" center",
gap: "10px"
}} onClick={updateSub}>Confirm</button>
        </div>
            </div>}
    </div>
)
}

export default UpgradeAdminPlan;