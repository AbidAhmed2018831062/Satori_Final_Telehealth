import { Box, Stack } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import NextAppointment from '../../CareProvider/Dashboard/NextAppointment';
import PastCareProviders from '../AppointmentBooking/PastCareProviders';

function MemberDashboardFirstPage({profile,events,setCareProvider,setEventDetails,setPage,pastAppoints})
{

return(
    <div>
        <h3 style={{fontSize:"35px",fontWeight:"bold"}}>Welcome {profile.firstName+" "+profile.lastName}</h3>
        {events.length>0&&<div style={{background: "var(--primary-color, #62C227)",padding:"10px",marginTop:"10px",borderRadius:"20px",color:"white",display:"flex",marginBottom:"30px", justifyContent:"space-between" }}><p style={{fontSize:"16px",fontWeight:"bold",color:"white"}}>You have an upcoming appointment</p>
    <button style={{backgroundColor:"white",padding:"5px 20px"}}><a href={events[0].meetingLink} style={{color:" rgba(98, 194, 39, 1)",textDecoration:"none",padding:"0px",margin:"0px"}}>Join Session</a></button></div>}
    {events.length===0&&(pastAppoints.length>0?!pastAppoints[0].reviewed:false)&&<div style={{background: "var(--primary-color, #62C227)",padding:"10px",marginTop:"10px",borderRadius:"20px",color:"white",display:"flex",marginBottom:"30px", justifyContent:"space-between" }}><p style={{fontSize:"16px",fontWeight:"bold",color:"white"}}>Rate your last session</p>
    <NavLink to={`/member/review/${pastAppoints[0]._id}`}><button style={{backgroundColor:"white",padding:"10px 30px"}}>Rate Care Provider</button></NavLink></div>}
      <Stack direction="row" sx={{alignItems:"center",gap:"20px"}}>
         <Box sx={{borderRadius: "20px",
border:" 1px solid var(--grey, #777)",padding:"10px 30px"}}>
       <p style={{color: "var(--primary-dark, #011F1E)",
fontSize: "20px",
fontStyle:" normal",
fontWeight: 400,
lineHeight: "normal"}}>Free Counselling Hours</p>
<span style={{fontSize:"35px",color:"#62C227",fontWeight:"bold"}}>{profile.hours<0?0:profile.hours} &nbsp;&nbsp;</span>
<span>Hours</span>
<p>Valid Until {profile.valid?profile.valid:"5/9/2024"}</p>
         </Box>
         <Box sx={{}}>
    {events.length===0&&<Box sx={{borderRadius: "20px",border:" 1px solid var(--grey, #777)",background: "var(--primary-color, #62C227)",padding:"10px 30px"}}>
       <p style={{
fontSize: "18px",
fontStyle:" normal",
fontWeight: 400,
lineHeight: "normal",color:"white"}}>You deserve to be happy<br></br>Find the Right Care Provider For you</p>

<NavLink to="/member/questions"><button style={{backgroundColor:"white",color:"#62C227",padding:"15px 55px",marginTop:"30px",width:"100%"}}>Book a Session</button></NavLink>
         </Box>}
         </Box>
        </Stack>

   {events.length>0&& <Box >
        <h3 style={{fontSize:"35px",marginTop:"20px",textAlign:"start"}}>Next Appointment</h3>
        <NextAppointment appointment={events[0]} setCareProvider={setCareProvider}setEventDetails={setEventDetails}setPage={setPage}/>
    </Box>}
   {events.length===0&& <PastCareProviders/>}
    </div>
)
}

export default MemberDashboardFirstPage;