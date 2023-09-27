import React, {useState} from 'react';
import axios from 'axios';
// MUI Components
import { Button, MenuItem, Select, createStyles } from '@mui/material';
import {Card} from '@mui/material'; 
import {CardContent} from '@mui/material';
import {TextField} from '@mui/material'; 
// stripe
import {useStripe, useElements, CardElement,CardNumberElement} from '@stripe/react-stripe-js';
// Util imports
// Custom Components
import CardInput from './CardInput';
import {country_list} from "./countrynames"
import Cookies from 'js-cookie';
import numberWithCommas from '../../assets/js/formatNumber';
import { baseURL } from '../../../config';

function CheckOutForm({page,plan,setPage,type,event2,notes,payload}) {
  console.log(plan);
  // State
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

    const res = await axios.post(`${baseURL}/members/pay`, {name: name});

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
          axios.post(`${baseURL}/careprovider/updatepayment`,event2).then(result=>{
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

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card:elements.getElement(CardNumberElement),
      billing_details: {
        name: name,
    
      
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const res = await axios.post(`${baseURL}/payment/sub`, {'payment_method': result.paymentMethod.id, 'email': email,name,country,planId:plan.id,id:Cookies.get("id")});
      // eslint-disable-next-line camelcase
      const {client_secret, status} = res.data;
      console.log(res.data);
      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function(result) {
          if (result.error) {
            console.log('There was an issue!');
            console.log(result.error);
            alert("Payment was not successful due to "+result.error.message)
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            console.log('You got the money!');
            // Show a success message to your customer
          }
        });
      } else {
        console.log(plan);
        axios.put(`${baseURL}/admin/updatepaymentinfo`,{
          paymentInfo:[{customer:res.data.id.customer,subscription:res.data.id.subscription}],
          id:Cookies.get("id"),
          
          subs:plan.title==="Free+"?0:4
        }).then(result=>setPage(page=>page+1)).catch(err=>console.log(err))
        // No additional information was needed
        // Show a success message to your customer
      }
    }
  };

  return (
    <div>
    <div style={{width:"75%",margin:"30px auto",display:"flex",justifyContent:"space-between",gap:"20px"}}>
    <div style={{flex:2}}>
      <h3 style={{fontSize:"35px",textAlign:'start',marginBottom:"0px"}}>Enter Payment Details</h3>
{type!=="member"&&      <p style={{fontSize:"16px",textAlign:'start',fontWeight:500,marginBottom:"20px",marginTop:"0px"}}>You wont be charged yet</p>
}        <p style={{fontSize:"16px",textAlign:'start',fontWeight:600}}>Card Information</p>
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
    <div style={{flex:1}}>
       
            </div>
           
    </div>
    <button style={{display: "block",
    width: "324px",
    height:"70px",
    backgroundColor:"#62C227",
    margin:"20px auto",
    padding: "10px",
    justifyContent:" center",
    alignItems:" center",
    gap: "10px",
    marginTop:"100px"
  
    }}onClick={type==="member"?handleSubmitSub:handleSubmitPay}>Confirm</button></div>
  );
}

export default CheckOutForm;