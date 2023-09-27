import React, { useEffect, useRef, useState } from 'react';
import image from "../../assets/images/image.png";
import { Box, Divider, Stack } from '@mui/material';
import UpcomingAppointments from './UpcomingAppointments';
import monthNames from '../../assets/js/monthNames';
import axios from 'axios';
import { baseURL } from '../../../config';
const hasEventToday=(events)=>{
    let totalToday=0;
    events.forEach(elem=>{
      const startDate=new Date(elem.start_time);
      console.log(startDate.getDate()+" "+new Date().getDate())
      if(new Date(elem.start_time).getDate()===new Date().getDate())
      totalToday++;
    });
    return totalToday;
}

function CareProviderFirstPage({profile,events,pastAppoints,setEvent,setPage,age})
{

  const dates=["Sunday, Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const totalToday=hasEventToday(events);
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);
  useEffect(() => {
  if(elementRef.current!==null)
    setHeight(elementRef.current.offsetHeight);
  }, []);

const upcomingAppointments=[
  {
    name:"John Doe",
    image:image,
start_time:"2023-09-13T07:00:00.000000Z",
    dob:"25 years old"
  },
  {
    name:"John Doe",
    image:image,
    start_time:"2023-09-13T07:00:00.000000Z",

    dob:"25 years old"
  },
  {
    name:"John Doe",
    image:image,
    start_time:"2023-09-13T07:00:00.000000Z",

    dob:"25 years old"
  }
];
const updateComplete=()=>{
  axios.put(`${baseURL}/careprovider/updateeventcomplete`,{
    id:pastAppoints[pastAppoints.length-1]._id,
    complete:true
  }).then(res=>{
    location.reload();
  }).catch(err=>console.log(err))
}
return(
    <div>
        
   <h3 style={{marginTop:"20px",marginBottom:"0px",fontSize:"35px"}}>Welcome Back {profile.firstName+" "+profile.lastName}!<br></br>
  {totalToday!==0&& <h3 style={{marginBottom:"20px",marginTop:"0px",fontSize:"35px"}}> You have {totalToday} Appointment Today</h3>}
  {totalToday===0&& <h3 style={{marginBottom:"20px",marginTop:"0px",fontSize:"35px"}}>You have no Appointment Today</h3>}

   </h3>
 {pastAppoints.length>0&&  <Box>
   <p style={{fontSize:"20px",color:"var(--primary-dark, #011F1E)",fontWeight:"bold"}}>Recent Appointment</p>
    <Stack direction="row" ref={elementRef}sx={{padding:"20px",borderRadius: "22px",justifyContent:"space-between",alignItems:'center',
border:" 1.1px solid var(--grey, #777)"}}>
    <Box sx={{flex:8}}>
      <Stack direction="row" sx={{alignItems:'center',gap:"20px",marginBottom:"30px"}}>
          <Box>
            <img src={image} style={{width:"90px",height:"90px"}}/>
          </Box>
          <Box>
            <p style={{fontSize:"20px",fontWeight:"bold",marginBottom:"0px"}}>{pastAppoints[pastAppoints.length-1].name}</p>
            <p style={{fontSize:"20px",fontWeight:"normal",marginTop:"0px"}}>{age(new Date(pastAppoints[pastAppoints.length-1].dob))} years old</p>
          </Box>
      </Stack>
      <Box>
     
      <Stack direction="row" sx={{gap:"20px"}}>
       <Box >
       <p style={{marginBottom:"0px"}}>Date</p>
         <Box sx={{borderRadius: "20px",
background: "var(--secondary-color, #EBE5DE)",padding:"10px"}}>
        {dates[new Date(pastAppoints[pastAppoints.length-1].start_time).getDay()]}, {new Date(pastAppoints[pastAppoints.length-1].start_time).getDate()} {monthNames(new Date(pastAppoints[pastAppoints.length-1].start_time).getMonth())} {new Date(pastAppoints[pastAppoints.length-1].start_time).getFullYear()}
        </Box></Box>
        <Box sx={{}}>
    <p style={{marginBottom:"0px"}}>Time</p>
        { <Box sx={{borderRadius: "20px",
background: "var(--secondary-color, #EBE5DE)",padding:"10px 20px"}}>
       {new Date(pastAppoints[pastAppoints.length-1].start_time).getHours()}:{new Date(pastAppoints[pastAppoints.length-1].start_time).getMinutes()}- {new Date(new Date(pastAppoints[pastAppoints.length-1].start_time).getTime()+30*60*1000).getHours()}:{new Date(new Date(pastAppoints[pastAppoints.length-1].start_time).getTime()+30*60*1000).getMinutes()}
        </Box>}
      
        </Box>
    </Stack>
      </Box>
    </Box>
  {height!=0&&  <Box sx={{flex:1,height:height}}>
  <Divider  orientation="vertical" sx={{height:height,}}></Divider>
    </Box>}
    <Box sx={{flex:4}}>
    <button style={{display: "flex",
width: "220px",
height:" 55px",
backgroundColor:"#62C227",
margin:"20px auto",
fontWeight:"bold",
padding: "10px",
justifyContent:" center",
alignItems:" center",
color:"white",
gap: "10px"
}} onClick={updateComplete}>Mark Complete</button>
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
}} onClick={e=>{
  setPage(5);
  setEvent(pastAppoints[pastAppoints.length-1])
}}>View Details</button>
    </Box>
    </Stack>
    </Box>}
 {events.length>0&&< Box>
  <p style={{fontSize:"20px",color:"var(--primary-dark, #011F1E)",fontWeight:"bold"}}>Next Appointment</p>
    <Stack direction="row" ref={elementRef}sx={{padding:"20px",borderRadius: "22px",justifyContent:"space-between",alignItems:'center',
border:" 1.1px solid var(--grey, #777)"}}>
    <Box sx={{flex:8}}>
      <Stack direction="row" sx={{alignItems:'center',gap:"20px",marginBottom:"30px"}}>
          <Box>
            <img src={image} style={{width:"90px",height:"90px"}}/>
          </Box>
          <Box>
            <p style={{fontSize:"20px",fontWeight:"bold",marginBottom:"0px"}}>{events[events.length-1].name}</p>
            <p style={{fontSize:"20px",fontWeight:"normal",marginTop:"0px"}}>{age(new Date(events[events.length-1].dob))} years old</p>
          </Box>
      </Stack>
      <Box>
     
         
      <Stack direction="row" sx={{gap:"20px"}}>
       <Box >
       <p style={{marginBottom:"0px"}}>Date</p>
         <Box sx={{borderRadius: "20px",
background: "var(--secondary-color, #EBE5DE)",padding:"10px"}}>
        {dates[new Date(events[events.length-1].start_time).getDay()]}, {new Date(events[events.length-1].start_time).getDate()} {monthNames(new Date(events[events.length-1].start_time).getMonth())} {new Date(events[events.length-1].start_time).getFullYear()}
        </Box></Box>
        <Box sx={{}}>
    <p style={{marginBottom:"0px"}}>Time</p>
        { <Box sx={{borderRadius: "20px",
background: "var(--secondary-color, #EBE5DE)",padding:"10px 20px"}}>
       {new Date(events[events.length-1].start_time).getHours()}:{new Date(events[events.length-1].start_time).getMinutes()}- {new Date(new Date(events[events.length-1].start_time).getTime()+30*60*1000).getHours()}:{new Date(new Date(events[events.length-1].start_time).getTime()+30*60*1000).getMinutes()}
        </Box>}
      
        </Box>
    </Stack>
      </Box>
    </Box>
  {height!=0&&  <Box sx={{flex:1,height:height}}>
  <Divider  orientation="vertical" sx={{height:height,}}></Divider>
    </Box>}
    <Box sx={{flex:4}}>
  {<a href={events[events.length-1].meetingLink}> <button style={{display: "flex",
width: "220px",
height:" 55px",
backgroundColor:"#62C227",
margin:"20px auto",
fontWeight:"bold",
padding: "10px",
justifyContent:" center",
alignItems:" center",
color:"white",
gap: "10px"
}}>Start Session</button></a> }
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
}} onClick={e=>{
  setPage(5);
  setEvent(events[events.length-1])
}}>View Details</button>
    </Box>
    </Stack></Box>}
    <p style={{fontSize:"20px",fontWeight:"bold"}}>Upcoming Appointments</p>
     <UpcomingAppointments upcomingAppointments={events} age={age} setPage={setPage} setEvent={setEvent}/>
  </div>
)
}

export default CareProviderFirstPage;