import { Box, MenuItem, Select, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../../config";
import ShowConfirmBooking from "./ShowConfirmBooking";
import Cookies from "js-cookie";
import {Card} from '@mui/material'; 
import {CardContent} from '@mui/material';
import {TextField} from '@mui/material'; 
// stripe
import {useStripe, useElements, CardElement,CardNumberElement} from '@stripe/react-stripe-js';
import { country_list } from "../../Administrator/Payment/countrynames";
import CardInput from "../../Administrator/Payment/CardInput";
export default function BookingConfirm({payload,careprovider,}){
    const [uuid,setUuid]=useState("");
    const [event2,setEvent]=useState();
    const [notes,setNotes]=useState(" ");
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('Indonesia');
  
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmitPay = async (event) => {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      const res = await axios.post(`${baseURL}/members/pay`, {name: name,id:Cookies.get("memberId")});
  
      const clientSecret = res.data['client_secret'];
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card:elements.getElement(CardNumberElement),
          billing_details: {
            name: name,
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
          axios.put(`${baseURL}/members/updateevent`,{
            event:payload.event.uri,
             events:event2,
             id:Cookies.get("memberId"),
             notes
          }).then(res=>{{
            axios.post(`${baseURL}/careprovider/updatepayment`,{  event:payload.event.uri}).then(result=>{
              console.log(result);
              location.reload();
            }).catch(err=>console.log(err))
            console.log(res)}}).catch(err=>console.log(err));
          
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    };
  
    const [profile,setProfile]=useState({});
    useEffect(()=>{
        axios.get(`${baseURL}/members/profile?id=${Cookies.get("memberId")}`,).then(result=>{
            console.log(result.data);
            setProfile(result.data);
        }).catch(err=>console.log(err));
     },[])
    useEffect(()=>{
        axios.get(`${baseURL}/members/getevent?uuid=${payload.event.uri}`).then(res=>{
            console.log(res);
            setUuid(payload.event.uri);
            setEvent(res.data);
            Cookies.set("uuid",payload.event.uri,{expires:365})
        }).catch(err=>console.log(err))
    },[])
    const [cardInput,setShowcardInput]=useState(false);

    return (
        <Box sx={{width:"75%",margin:"30px auto"}}>
           {uuid.length>0&&Object.keys(profile).length>0&&<Stack direction="row" sx={{justifyContent:'space-between',gap:"30px"}}>
          {parseFloat(profile.hours)>0&&  <Box sx={{flex:1}}>
                <h3 style={{fontSize:"35px",textAlign:"start"}}>Confirm Your Session</h3>
                <p style={{fontWeight:700,textAlign:"start"}}>
                    Write notes to your care provider
                </p>
                <textarea rows="10" value={notes}onChange={e=>setNotes(e.currentTarget.value)} style={{borderRadius:"20px",width:"90%",padding:"20px",background:"#fff"}} placeholder="Write a note to your care provider"/>
            </Box>}
            {parseFloat(profile.hours)<=0&&    <div style={{flex:1}}>
    <div style={{width:"75%",margin:"30px auto",display:"flex",justifyContent:"space-between",gap:"20px"}}>
    <div style={{flex:2}}>
      <h3 style={{fontSize:"35px",textAlign:'start',marginBottom:"0px"}}>Enter Payment Details</h3>
      <p style={{fontSize:"16px",textAlign:'start',fontWeight:500,marginBottom:"20px",marginTop:"0px"}}>You wont be charged yet</p>
       <p style={{fontSize:"16px",textAlign:'start',fontWeight:600}}>Card Information</p>
        <CardInput />
        <div >
        <p style={{fontSize:"16px",marginTop:"15px",textAlign:'start',fontWeight:600}}>Name on Card</p>
        <TextField
        
          id='outlined-email-input'
          sx={{borderRadius:"28px",marginTop:"0px","&:active":{
            borderRadius:"28px",
          }, '& label.Mui-focused': {
            borderColor: 'black',
            borderRadius:"20px"
          },
          '& .MuiInput-underline:after': {
            borderColor: 'black',
            borderRadius:"20px"
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
            '&:hover fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
          },}}
          margin='normal'
        
          type='text'
          placeholder='Enter Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
         {/* <p style={{fontSize:"16px",marginTop:"15px",textAlign:'start',fontWeight:600}}>Card Holder Email</p>
        <TextField
          label='Email'
          id='outlined-email-input'
          placeholder='Enter Email'
          margin='normal'
        
          type='email'
          required
          sx={{borderRadius:"28px",marginTop:"0px","&:active":{
            borderRadius:"28px",
          }}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        /> */}
        <p style={{fontSize:"16px",marginTop:"15px",textAlign:'start',fontWeight:600}}>Country or Region</p>
       <Select value={country}  sx={{width:"100%",textAlign:"start",borderRadius:"28px",marginTop:"0px","&:active":{
            borderRadius:"28px",
          }, '& label.Mui-focused': {
            borderColor: 'black',
            borderRadius:"20px"
          },
          '& .MuiInput-underline:after': {
            borderColor: 'black',
            borderRadius:"20px"
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
            '&:hover fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
              borderRadius:"20px"
            },
          },}} onChange={e=>setCountry(e.target.value)}
>
        {country_list.map(country1=>{
          return <MenuItem key ={country1} value={country1} >{country1}</MenuItem>
        })}
        </Select>
        </div>
    </div>
  
           
    </div>
    </div>}
            <ShowConfirmBooking careprovider={careprovider} payload={payload} event={event2} notes={notes} handleSubmitPay={handleSubmitPay}/></Stack>}
        </Box>
    )
}