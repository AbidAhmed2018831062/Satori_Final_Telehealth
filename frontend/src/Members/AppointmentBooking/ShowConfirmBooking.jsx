import { useEffect, useState } from "react";
import ShowHead from "./ShowHead";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { baseURL } from "../../../config";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import monthNames from "../../assets/js/monthNames";
import CardInput from "../../Administrator/Payment/CardInput";
import CheckOutForm from "../../Administrator/Payment/CheckOutForm";
export default function ShowConfirmBooking({bookingsuccesful,setBookingSuccessful,careprovider,event,payload,notes,handleSubmitPay}){
    const [profile,setProfile]=useState({});
    const [navigate,setNavigate]=useState(false);
    const dates=["Sunday, Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    console.log(new Date(event.resource.start_time))
    const confirm=()=>{
        axios.put(`${baseURL}/members/updateevent`,{
            event:payload.event.uri,
             events:event,
             id:profile._id,
             notes
          }).then(res=>{{
            setNavigate(true);
            // setBookingSuccessful(true);
            Cookies.remove("uuid");
            console.log(res)}}).catch(err=>console.log(err));
    }
    useEffect(()=>{
        axios.get(`${baseURL}/members/profile?id=${Cookies.get("memberId")}`,).then(result=>{
            console.log(result.data);
            setProfile(result.data);
        }).catch(err=>console.log(err));
     },[])
    const pay=()=>{
        setShowcardInput(true);
    }
    return (
        <Box sx={{flex:2/3}}>
            {navigate&&<Navigate to="/member/"></Navigate>}
       <Box sx={{borderRadius: "20px",textAlign:"start",
border: "1px solid var(--grey, #777)",padding:"10px 30px",marginBottom:"20px"}}>
    <ShowHead careprovider={careprovider}/>
    <Stack direction="row" sx={{justifyContent:'space-between',gap:"20px"}}>
       <Box >
       <p style={{marginBottom:"0px"}}>Date</p>
         <Box sx={{borderRadius: "20px",
background: "var(--secondary-color, #EBE5DE)",padding:"10px"}}>
        {dates[new Date(event.resource.start_time).getDay()]}, {new Date(event.resource.start_time).getDate()} {monthNames(new Date(event.resource.start_time).getMonth())} {new Date(event.resource.start_time).getFullYear()}
        </Box></Box>
        <Box sx={{}}>
    <p style={{marginBottom:"0px"}}>Time</p>
         <Box sx={{borderRadius: "20px",
background: "var(--secondary-color, #EBE5DE)",padding:"10px 20px"}}>
       {new Date(event.resource.start_time).getHours()}:{new Date(event.resource.start_time).getMinutes()}- {new Date(new Date(event.resource.start_time).getTime()+30*60*1000).getHours()}:{new Date(new Date(event.resource.start_time).getTime()+30*60*1000).getMinutes()}
        </Box></Box>
    </Stack>
</Box>

{Object.keys(profile).length>0&&parseFloat(profile.hours)>0&&<Box sx={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",padding:"10px 30px"}}>
   
   <p style={{textAlign:"start",}}>You have <span style={{fontWeight:700}}>{profile.hours} hours</span> free counselling hours.</p>
   <p style={{textAlign:"start",}}>By confirming this session, you agree to redeem 30 minutes of free counseling.</p>
 
</Box>}
{Object.keys(profile).length>0&&parseFloat(profile.hours)<=0&&<Box sx={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",padding:"10px 30px"}}>
   
  <Stack direction="row" sx={{justifyContent:"space-between",gap:"20px"}}>
  <p style={{fontWeight:"bold"}}>Total Payments</p>

    <p style={{fontWeight:"bold"}}>Rp.400.000</p>
  </Stack>
 
</Box>}
<button onClick={parseFloat(profile.hours)>0?confirm:handleSubmitPay} style={{borderRadius: "15px",
background: "var(--primary-color, #62C227)",color:"white",width:"100%",marginTop:"30px"}}>Confirm</button>
        </Box>
    )
}