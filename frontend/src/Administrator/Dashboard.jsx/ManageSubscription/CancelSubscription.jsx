import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar';
import { Box, Stack } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { baseURL } from '../../../../config';
function CancelSubscription()
{
    const [value,setValue]=useState("");
    const [profile,setProfile]=useState({});
    useEffect(()=>{
       axios.get(`${baseURL}/admin/profile?id=${Cookies.get("id")}`,).then(result=>{
           console.log(result.data);
           setProfile(result.data);
          
       }).catch(err=>console.log(err));
    },[]);
    const [navigate,setNavigate]=useState(false);
    const cancelSub=()=>{
        setError(false);
        if(value.length===0)
        {
            setError(true);
            return "";
        }
        axios.delete(`${baseURL}/payment/cancel?id=${Cookies.get("id")}`).then(res=>{
            console.log(res);
            setNavigate(true);

        }).catch(err=>console.log(err))
    }
    const [error,setError]=useState(false);
return(
    <div>
        {navigate&&<Navigate to="/admin"></Navigate>}
     {Object.keys(profile).length&&  <Box sx={{textAlign:"start",
}}>
        <AdminNavbar>
            
        </AdminNavbar>
        <Box sx={{width:"65%",margin:"50px auto"}}>
            <h3 style={{color:" var(--primary-dark, #011F1E)",
fontFamily:" Nunito",
fontSize: "35px",
fontStyle: "normal",
fontWeight: 700,
marginBottom:"10px",
textAlign:"start",
}}>
    We’re sad to see you go...
</h3>
<div style={{padding:"10px",borderRadius: "20px",width:"fit-content",
background: "var(--secondary-color, #EBE5DE)"}}>
    <p style={{color:" var(--primary-dark, #011F1E)",
fontFamily:" Nunito",
fontSize: "16px",
fontStyle: "normal",
marginBottom:"20px",
textAlign:"start",
fontWeight:500

}}>Your members will have access to their sponsored counseling hours until {new Date(new Date(profile.dateStart).setMonth(new Date().getMonth()+12)).getDate()+"/"+parseInt(new Date(new Date(profile.dateStart).setMonth(new Date().getMonth()+12)).getMonth()+1)+"/"+new Date(new Date(profile.dateStart).setMonth(new Date().getMonth()+12)).getFullYear()}.
You will not receive a refund for the current billing cycle.</p>
</div>
<p style={{color:" var(--primary-dark, #011F1E)",
fontFamily:" Nunito",
fontSize: "16px",
fontStyle: "normal",
marginBottom:"20px"

}}>Please let us know your cancellation reason. <br></br>Your feedback helps us improve.</p>
       
<textarea type='textfiled' value={value} onChange={e=>setValue(e.currentTarget.value)} rows="13"style={{width:"100%",borderRadius: "20px",padding:"10px",
border:" 1px solid #000",backgroundColor:"white",color:"black",fontSize:"20px" }} placeholder='Enter Something' />     
{error&&<p style={{margin:"0px",color:"red"}}>*Please writer something</p>}  
<Stack direction="row">
 <Box flex={1}></Box>
 <Stack flex={1} direction="row">

 <button style={{display: "flex",
width: "220px",
height:" 55px",
backgroundColor:"#62C227",
margin:"20px auto",
fontWeight:"bold",
padding: "10px",
justifyContent:" center",
alignItems:" center",
gap: "10px"
}}>Contact Us</button>
 <button style={{display: "flex",
width: "220px",
height:" 55px",
backgroundColor:"#fff",
margin:"20px auto",
padding: "10px",
borderColor:"#62C227",
color:"#62C227",
fontWeight:"bold",

justifyContent:" center",
alignItems:" center",
gap: "10px"
}}onClick={cancelSub}>Unsubscribe</button>
</Stack>   
</Stack>
 </Box>
 </Box>}
    </div>
)
}

export default CancelSubscription;