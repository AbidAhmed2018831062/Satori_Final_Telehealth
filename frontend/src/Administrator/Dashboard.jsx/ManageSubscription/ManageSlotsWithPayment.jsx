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
function ManageSlotsWithPayment()
{
     const [profile,setProfile]=useState({});
    const [selectedPlan,setSelectedPlan]=useState({})
    const [add,setAdd]=useState(0);
    const [plans,setPlans]=useState([]);
    useEffect(()=>{
      
        axios.get(`${baseURL}/payment/plans`).then(res=>{
            console.log(res.data.data[0]);
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
            setAdd(Cookies.get("subscription")===0?3:12)
            setPlans(plan);
            setSelectedPlan(plan[Cookies.get("subscription")])
        }).catch(err=>console.log(err));
    },[]);
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
    const handleSubmitPay = async (event) => {
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        const res = await axios.post(`${baseURL}/payment/pay`, {id:Cookies.get("id"),email: "ahmedabid3409@gmail.com",price:selectedPlan.price*1000*slots});
    
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
            axios.put(`${baseURL}/admin/updateslots`,{id:Cookies.get("id"),slots}).then(result1=>{console.log(result1)
            setNavigate(true);
        
        }).catch(err=>console.log(err))
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          }
        }
      };
  
    useEffect(()=>{
        axios.get(`${baseURL}/payment/getpaymentmethod?id=${Cookies.get("id")}`).then(result=>{
            console.log(result);
            setPaymentMethods(result.data.data)
            console.log(result.data.data[0]);
        }).catch(err=>console.log(err))
    },[])
 const [slots,setSlots]=useState(0);
 const [old,setOld]=useState('a');
 const handleChange1 = (event) => {
    setOld(event.target.value);
  };
return(
    <div>
          {navigate&&<Navigate to="/admin"></Navigate>}
  <AdminNavbar/>
 {Object.keys(profile).length>0&&paymentMethods.length>0&&Object.keys(selectedPlan).length>0&&  <div style={{width:"75%",margin:"30px auto",display:"flex",justifyContent:"space-between",gap:"20px"}}>
   <div style={{flex:2,}}>
    <div style={{width:"50%"}}>
       <h3 style={{fontSize:"35px",marginBottom:"10px",marginLeft:"0px",paddingLeft:"0px",textAlign:"start"}}>Update Member Slots</h3>
       <p style={{fontSize:"20px",marginBottom:"20px",textAlign:"start"}}>How many members will be using this plan?</p>
           <input type="number"value={slots}onChange={e=>setSlots(e.currentTarget.value)} placeholder="Enter Slots" style={{display:"block",backgroundColor:"white",width:"90%", borderRadius:"10px", paddingTop:"20px",paddingLeft:"10px",paddingBottom:"20px",color:"black",marginBottom:"20px"}}></input>
       
       </div>
         <CardShow name={name}setName={setName} paymentMethods={paymentMethods} old={old}handleChange1={handleChange1}/>
   </div>
   <div style={{flex:1}}>
            <h3 style={{fontSize:"35px",marginBottom:"20px",textAlign:"start"}}>Summary</h3>
            <p style={{fontSize:"20px",marginBottom:"10px",textAlign:"start"}}>Current Plan</p>
          <ShowPlanDetails selectedPlan={selectedPlan} profile={profile}/>
<p style={{fontSize:"20px",marginBottom:"10px",marginTop:"20px",textAlign:"start",fontWeight:"bold"}}>Additional Slots</p>
<div style={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",padding:"20px"}}>
    <p style={{fontSize:"20px",marginTop:"20px",textAlign:"start"}}>Add Slots:</p>
    <p style={{fontSize:"20px",marginTop:"20px",textAlign:"start"}}>{slots}members/</p>

<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"20px"}}>
    <p style={{fontSize:'16px',textAlign:"start"}}>{selectedPlan.title}</p>
    <p style={{fontSize:'16px'}}>IDR {numberWithCommas(selectedPlan.price*1000*slots)}</p>
</div>
<div style={{width:"100%",backgroundColor:"#011F1E",height:"1px"}}></div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"10px",marginTop:"20px"}}>
    <p style={{fontSize:'16px'}}>Total</p>
    <p style={{fontSize:'16px'}}>IDR {numberWithCommas(selectedPlan.price*1000*slots)}</p>
</div>

</div>
<div style={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",padding:"20px",marginBottom:"20px",marginTop:"20px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"20px"}}>
    <p style={{fontSize:'16px',textAlign:"start"}}>Total Additonal Payment</p>
    <p style={{fontSize:'16px'}}>{numberWithCommas(slots*(parseFloat(selectedPlan.price)*1000))}</p>
</div>
</div>
<button style={{display: "flex",
width: "100%",
height:" 50px",
backgroundColor:slots>0?"#62C227":"#CECECE",
margin:"20px auto",
padding: "10px",
justifyContent:" center",
alignItems:" center",
gap: "10px"
}} onClick={handleSubmitPay}>Confirm</button>
            </div>
   </div>}
   </div>
)
}

export default ManageSlotsWithPayment;