import React, { useEffect, useState } from 'react';
import CardInput from '../Payment/CardInput';
import axios from 'axios';
import { baseURL } from '../../../config';
import Cookies from 'js-cookie';
import { Card, MenuItem, Select, TextField } from '@mui/material';
import { country_list } from '../Payment/countrynames';
import {loadStripe} from '@stripe/stripe-js';
import { CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';

function ChangePayment()
{
 const [payment,setPayment]=useState({});
 useEffect(()=>{
    axios.get(`${baseURL}/payment/lastmethod?id=${Cookies.get("id")}`).then(result=>{
        console.log(result.data.data[result.data.data.length-1]);
        setPayment({card:"XXXX XXXX XXXX "+result.data.data[result.data.data.length-1].card.last4,expiry:result.data.data[result.data.data.length-1].card.exp_month+"/"+result.data.data[result.data.data.length-1].card.exp_year,cvc:""});
        
     }).catch(err=>console.log(err))
 },[]);
 const stripe = useStripe();
 const elements = useElements();
const submit=async()=>{
    const result = await stripe.createPaymentMethod({
        type: 'card',
        card:elements.getElement(CardNumberElement),
        billing_details: {
          name: name,
      },
      });
  axios.put(`${baseURL}/payment/updatemethod`,{
   payment_method:result.paymentMethod.id,
   id:Cookies.get("id")
  }).then(res=>{console.log(res)
setSuccess(true)}).catch(err=>console.log(err));
}

const [success,setSuccess]=useState(false);
const [name, setName] = useState('');
const [country, setCountry] = useState('Indonesia');
return(
    <div style={{width:"65%",margin:"20px"}}>
      {success&& <div style={{background: "var(--primary-color, #62C227)",padding:"10px",marginTop:"10px",borderRadius:"20px",color:"white",display:"flex",justifyContent:"space-between" }}><p style={{fontSize:"20px",fontWeight:"bold"}}>Payment Details Updated Successfully</p>
     <p onClick={e=>setSuccess(false)} style={{textAlign:"end",cursor:"pointer",fontWeight:"bold",fontSize:"20px",marginRight:"20px"}}>X</p></div>}
         <div style={{display:"flex",gap:"20px",textAlign:"start",marginTop:"20px"}}></div>
         <h3 style={{fontSize:"35px",marginBottom:"0px"}}>Change Payment Details</h3>
        <p style={{fontSize:"18px",marginTop:"0px"}}>Enter a new credit card information to change Payment Details</p>
  { Object.keys(payment).length>0&& <form>
    <p style={{fontSize:"16px",marginTop:"15px",textAlign:'start',fontWeight:600}}>Card Information</p>

    <CardInput/>
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
       <Select value={country}  sx={{width:"100%",textAlign:"start",borderRadius:"28px",marginTop:"0px", border: '1px solid black',"&:active":{
            borderRadius:"28px",
          }, '& label.Mui-focused': {
            borderColor: '1px solid black',
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
             </form> }
            <div style={{display:"flex",justifyContent:"space-between",marginTop:"30px"}}>
                <div style={{flex:1}}></div>
                <div style={{flex:1,textAlign:"end"}}>
                <button style={{backgroundColor:"#62C227",padding:"10px 30px"}}onClick={submit}>Save Changes</button>
                </div>
            </div>
    </div>
)
}

export default ChangePayment;