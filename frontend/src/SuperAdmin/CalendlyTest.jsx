import { computeSlots } from '@mui/x-data-grid/internals';
import axios from 'axios';
import React, { useEffect } from 'react';

function Calednly()
{
   
      useEffect(()=>{
       const requestBody = {
      "grant_type":"authorization_code",
      "code":"UDzC_E0EXi17B08IhUU29j-2-cnhmUib3ziFLmgE7cE",
      "redirect_uri":"https://staging.talkwithsatori.com/oauth/callback",
      "code_verifier":true,
  
        };
    
     axios.post(
          'https://calendly.com/oauth/token',
          requestBody,
          {
           
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':"Basic wQm6Csmc6SrSsaFnj8MKn4JFfyE0XmnUS8VX2j07PIs"
          }
           
          },
        ).then(res=>console.log(res)).catch(err=>console.log(err));

      
      },[])
return(
    <div>
    </div>
)
}

export default Calednly;