import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import { baseURL } from "../../../config";
import Cookies from "js-cookie";
import BookingConfirm from "./BookingConfirm";

export default function Calendly({careprovider,payload,setPayload,bookingsuccesful,setBookingSuccessful}){
  const [profile,setProfile]=useState({});
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: (e) => {
      console.log(e);
      },
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => { 
      axios.post(`${baseURL}/members/scheduleevent`,{
        event:e.data.payload.event.uri,
        invitee:e.data.payload.invitee.uri,
        email:profile.email,
        id:profile._id,
        careProviderId:careprovider._id,
        careProviderName:careprovider.firstName+" "+careprovider.lastName+", "+careprovider.degree,
        careProviderImage:careprovider.images,confirmed:false
      }).then(res=>{{
        setPayload(e.data.payload)
        setBookingSuccessful(true)
        console.log(res)}}).catch(err=>console.log(err));
      }
  });
  useEffect(()=>{
     axios.get(`${baseURL}/members/profile?id=${Cookies.get("memberId")}`,).then(result=>{
         console.log(result.data);
         setProfile(result.data);
     }).catch(err=>console.log(err));
  },[])
    return (
      <Box sx={{flex:1,margin:"0px",padding:"0px",marginTop:"-30px"}}>
{Object.keys(profile).length>0&&
        <InlineWidget url={careprovider.scheduleLink} styles={{
  height: '960px'
}}
prefill={{
  email: profile.email,
  firstName: profile.firstName,
  lastName:profile.lastName,
  name:profile.firstName+" "+profile.lastName,


}}
/>}
{bookingsuccesful&&<button onClick={e=>setBookingSuccessful(false)}></button>}
      </Box>
    )
}