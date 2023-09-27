import React from 'react';
import {CardElement,PaymentElement,CardNumberElement,CardCvcElement,CardExpiryElement} from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      'color': '#32325d',
      'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
      'fontSmoothing': 'antialiased',
      'fontSize': '16px',
      '::placeholder': {
        color: '#000',
      },
      
    },
    empty:{
    borderColor:"1px solid red"
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export default function CardInput() {
  return (
<form>
<div style={{border:"1px solid black",borderRadius:"28px 28px 28px 28px"}}>
  
  <div style={{borderBottom:"1px solid black",paddingLeft:"10px",paddingTop:"20px",paddingBottom:"20px",}}>
  <label >
            
          <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
               
            </label>
            </div>
           <div style={{display:"flex",justifyContent:"space-between",gap:"0px",flexDirection:"row"}}>
            <div style={{paddingLeft:"10px",paddingTop:"20px",paddingBottom:"20px",flex:1,borderRight:"1px solid black"}}>
            <label>
               <CardExpiryElement options={CARD_ELEMENT_OPTIONS}  />
            </label>
            </div>
            <div style={{paddingLeft:"10px",paddingTop:"20px",paddingBottom:"20px",flex:1}}>

            <label>
              
                <CardCvcElement options={CARD_ELEMENT_OPTIONS}  />
            </label>
            </div>
            </div>
            </div> </form> 
           );
}