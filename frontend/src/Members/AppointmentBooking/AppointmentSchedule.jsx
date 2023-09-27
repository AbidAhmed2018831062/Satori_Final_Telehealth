import { Box, Stack } from "@mui/material";
import monthNames from "../../assets/js/monthNames";
import { PopupButton, useCalendlyEventListener } from "react-calendly";
import axios from "axios";
import { baseURL } from "../../../config";
import Cookies from "js-cookie";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AppointmentSchedule({eventDetails,careprovider,profile,type}){
    const dates=["Sunday, Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const [promptUser,setPromptUser]=useState(false);
    const [cancelled,setCancelled]=useState(false);
    const [text,setText]=useState("");
    const updateComplete=()=>{
      axios.put(`${baseURL}/careprovider/updateeventcomplete`,{
        id:eventDetails._id,
        complete:true
      }).then(res=>{
        location.reload();
      }).catch(err=>console.log(err))
    }
    const updateNoShow=()=>{
      axios.put(`${baseURL}/careprovider/updatenoshow`,{
        id:eventDetails._id,
        noShow:true
      }).then(res=>{
        location.reload();
      }).catch(err=>console.log(err))
    }
    const cancelEvent=(type)=>{
        axios.post(`${baseURL}/members/usercancel`,{
            event:eventDetails.event,
            memberId:Cookies.get("memberId"),
            type
        }).then(res=>{
          if(type==="reschedule")
          window.location.reload();
            setCancelled(true);
           
            setPromptUser(false)
            console.log(res)}).catch(err=>console.log(err))
    }
    useCalendlyEventListener({
        onProfilePageViewed: () => console.log("onProfilePageViewed"),
        onDateAndTimeSelected: (e) => {
          console.log(e);
          },
        onEventTypeViewed: () => console.log("onEventTypeViewed"),
        onEventScheduled: (e) => { 
          axios.post(`${baseURL}/members/rescheduleevent`,{
            event:e.data.payload.event.uri,
            invitee:e.data.payload.invitee.uri,
            email:profile.email,
            id:profile._id,
            careProviderId:careprovider._id,
            careProviderName:careprovider.firstName+" "+careprovider.lastName+", "+careprovider.degree,confirmed:true
          }).then(res=>{{
            setPayload(e.data.payload);
            setBookingSuccessful(true);
            console.log(res)}}).catch(err=>console.log(err));
           cancelEvent("reschedule");
          }
          
      });
    return (<Box sx={{flex:4/5}}>
      <p style={{fontSize:"20px",fontWeight:'bold',textAlign:'start'}}>Appointment Schedule</p>
      <Stack direction="row" sx={{gap:"20px"}}>
       <Box >
       <p style={{marginBottom:"0px"}}>Date</p>
         <Box sx={{borderRadius: "20px",
background: "var(--secondary-color, #EBE5DE)",padding:"10px"}}>
        {dates[new Date(eventDetails.start_time).getDay()]}, {new Date(eventDetails.start_time).getDate()} {monthNames(new Date(eventDetails.start_time).getMonth())} {new Date(eventDetails.start_time).getFullYear()}
        </Box></Box>
        <Box sx={{}}>
    <p style={{marginBottom:"0px"}}>Time</p>
        { <Box sx={{borderRadius: "20px",
background: "var(--secondary-color, #EBE5DE)",padding:"10px 20px"}}>
       {new Date(eventDetails.start_time).getHours()}:{new Date(eventDetails.start_time).getMinutes()}- {new Date(new Date(eventDetails.start_time).getTime()+30*60*1000).getHours()}:{new Date(new Date(eventDetails.start_time).getTime()+30*60*1000).getMinutes()}
        </Box>}
      
        </Box>
    </Stack>
    {type==="care"&&<Box>
  <button onClick={updateComplete} style={{borderRadius: "15px",
background: "var(--primary-color, #62C227)",color:"white",width:"100%",marginTop:"30px"}} >Mark Complete</button>
  <button onClick={updateNoShow} style={{borderRadius: "15px",
background: "var(--primary-color, #fff)",color:"#62C227",width:"100%",marginTop:"30px",border:"1px solid #62C227"}}>Mark No Show</button>

      </Box>}
    {type!=="care"&&<Box>
   {!promptUser&&!cancelled&& <Box>
    <button onClick={confirm} style={{borderRadius: "15px",
background: "var(--primary-color, #62C227)",color:"white",width:"100%",marginTop:"30px"}}><a href={eventDetails.meetingLink} style={{color:"white",textDecoration:"none"}}>Join Session</a> </button>
   {/* <button onClick={confirm} style={{borderRadius: "15px",
background: "#fff",color:"var(--primary-color, #62C227)",width:"100%",marginTop:"30px",border:"1px solid #62C227"}}>Rescheudle Session</button> */}
<PopupButton
        url={careprovider.scheduleLink}
       styles={{borderRadius: "15px",
       background: "#fff",color:"var(--primary-color, #62C227)",width:"100%",marginTop:"30px",border:"1px solid #62C227"}}
        rootElement={document.getElementById("root")}
        text="Reschedule Session"
        prefill={{
            email: profile.email,
            firstName: profile.firstName,
            lastName:profile.lastName,
            name:profile.firstName+" "+profile.lastName,
          
          
          }}
      />
<p style={{color:"var(--primary-color, #62C227)",textDecoration:"underline",textAlign:"center",cursor:'pointer'}} onClick={e=>setPromptUser(true)}>Cancel Session</p>
    </Box>}

    {promptUser&&<Box>
            <p>Are you sure you want to cancel your session?</p>
            <Stack direction="row" spacing={2}>
            <button style={{background:"#62C227",padding:"5px 20px",color:'white'}}onClick={e=>setPromptUser(false)}>No</button>
                <button style={{background:"#CECECE",padding:"5px 20px",color:'black'}} onClick={e=>cancelEvent("cancel")}>Yes</button>
           

            </Stack>
            </Box>}
            {cancelled&&<Box>
                <p>Your session is successfully canceled.</p>
                <p>You will receive your sponsored hours back</p>

               <NavLink to="/member/showcareproviders">  <button onClick={confirm} style={{borderRadius: "15px",
background: "var(--primary-color, #62C227)",color:"white",width:"100%",marginTop:"30px"}}>Book Another Session </button></NavLink>
   {/* <button onClick={confirm} style={{borderRadius: "15px",
background: "#fff",color:"var(--primary-color, #62C227)",width:"100%",marginTop:"30px",border:"1px solid #62C227"}}>Rescheudle Session</button> */}

<NavLink to="/member/"><p style={{color:"var(--primary-color, #62C227)",textDecoration:"underline",textAlign:"center",cursor:'pointer'}} onClick={e=>window.location.reload()}>Back to dashboard</p></NavLink>

                </Box>}
                </Box>}
    </Box>)
}