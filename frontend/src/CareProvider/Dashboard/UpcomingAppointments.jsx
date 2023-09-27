import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Box, MenuItem, Select, Stack } from '@mui/material';
import monthNames from '../../assets/js/monthNames';
import { baseURL } from '../../../config';
import carep from "../../assets/images/carep.png";
import { NavLink } from 'react-router-dom';

function UpcomingAppointments({upcomingAppointments,type,age,setPage,setEvent})
{
  const dates=["Sunday, Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const [events,setAllEvents]=useState(upcomingAppointments)
const items=[
  {label:"All",value:"all"},
    {label:"This Week",value:"week"},
    {label:"This Month",value:"month"},
    {label:"Today",value:"today"},

] 
const [value,setValue]=useState("all");
const changeValue=(e)=>{
  setValue(e.target.value);
  if(e.target.value==="week")
  {
    console.log(e.target.value)
    const ev=[];
    upcomingAppointments.forEach(element => {
     
      const upDate=new Date();
      upDate.setDate=upDate.getDate()+7;
      console.log(new Date(element.start_time).toLocaleDateString()+" "+upDate.toLocaleDateString())
      if(new Date(element.start_time).getTime()<=(Date.now()+7*24*3600*1000))
      ev.push(element)
    });
   setAllEvents(ev);
  }
  else if(e.target.value==="today")
  {
    const ev=[];
    upcomingAppointments.forEach(element => {
      const upDate=new Date();
      upDate.setDate=upDate.getDate()+1;
      if(new Date(element.start_time).getTime()<=(Date.now()+1*24*3600*1000))
      ev.push(element)
    });
   setAllEvents(ev);
  }
  else if(e.target.value==="month")
  {
    const ev=[];
    upcomingAppointments.forEach(element => {
      const upDate=new Date();
      upDate.setMonth=upDate.getMonth()+1;
      if(new Date(element.start_time).getTime()<=(Date.now()+30*24*3600*1000))
      ev.push(element)
    });
   setAllEvents(ev);
  }
  else
  setAllEvents(upcomingAppointments);
}
return(
    <div style={{marginTop:"30px"}}>
     {upcomingAppointments.length>0? <div>
   
         <Stack direction="row" sx={{justifyContent:'space-between',alignItems:'center'}}>
            <Box sx={{flex:1}}>

            </Box>
            <Box sx={{flex:1,textAlign:"end"}}>
         
          <Select sx={{borderRadius: "20px",
background: "var(--secondary-color, #EBE5DE)",padding:"1px 30px"}}
value={value}
onChange={changeValue}
>
 {items.map(e=><MenuItem key={e}value={e.value}>{e.label}</MenuItem>)}
</Select>
</Box>
      
         </Stack>
         <Stack direction="row" sx={{justifyContent:'space-between',alignItems:'center',marginTop:"20px",marginBottom:"20px",gap:"20px"}}>
         {events.map(appoint=>{
            return(
                <Box key={appoint}>
 <Box sx={{flex:8,borderRadius:" 20px",
border: "1px solid var(--grey, #777)",padding:"20px"}}>
      <Stack direction="row" sx={{alignItems:'center',gap:"20px",marginBottom:"30px"}}>
          <Box>
            <img src={(type==="rate"&&appoint.careProviderImages)?`${baseURL}/images/${appoint.careProviderImages}`:carep} style={{width:"90px",height:"90px"}}/>
          </Box>
          <Box>
            <p style={{fontSize:"20px",fontWeight:"bold",marginBottom:"0px",marginTop:"0px"}}>{type==="rate"?appoint.careProviderName:appoint.name}</p>
          {type!=="rate"&& <p style={{fontSize:"20px",fontWeight:"bold",marginBottom:"0px",marginTop:"0px"}}>{age(new Date(appoint.dob))} years old</p>}
          </Box>
      </Stack>
      <Box>
     
      <Stack direction="row" sx={{alignItems:'center',gap:"50px",marginBottom:"30px"}}>
              <Box>   <p style={{marginBottom:"0px"}}>Date</p>
              <Box sx={{borderRadius: "20px",
    background: "var(--secondary-color, #EBE5DE)",padding:"10px 20px"}}>
      <p style={{margin:"0px"}}>{dates[new Date(appoint.start_time).getDay()]}, {new Date(appoint.start_time).getDate()} {monthNames(new Date(appoint.start_time).getMonth())} {new Date(appoint.start_time).getFullYear()}</p>
    </Box>
    </Box>
    <Box>   <p style={{marginBottom:"0px"}}>Time</p>
              <Box sx={{borderRadius: "20px",
    background: "var(--secondary-color, #EBE5DE)",padding:"10px 20px"}}>
      <p style={{margin:"0px"}}>    {new Date(appoint.start_time).getHours()}:{new Date(appoint.start_time).getMinutes()}- {new Date(new Date(appoint.start_time).getTime()+30*60*1000).getHours()}:{new Date(new Date(appoint.start_time).getTime()+30*60*1000).getMinutes()}</p>
    </Box>
    </Box>
              </Stack>
      </Box>
     {type==="rate"?<NavLink to={`/member/review/${appoint._id}`}> <button style={{display: "flex",
width: "100%",
backgroundColor:"#62C227",
margin:"20px auto",
fontWeight:"bold",
padding: "10px",
justifyContent:" center",
alignItems:" center",
color:"white",
gap: "10px",
borderRadius:"15px"
}}>Rate Care Provider</button></NavLink>: <button style={{display: "flex",
width: "100%",
backgroundColor:"#62C227",
margin:"20px auto",
fontWeight:"bold",
padding: "10px",
justifyContent:" center",
alignItems:" center",
color:"white",
gap: "10px",
borderRadius:"15px"
}} onClick={e=>{
  setPage(5);
  setEvent(appoint)
}}>View Details</button>}
    </Box>
    
                </Box>
            )
         })}
         </Stack>
         </div>:
         <div><p>No events to show</p></div>}
    </div>
)
}

export default UpcomingAppointments;