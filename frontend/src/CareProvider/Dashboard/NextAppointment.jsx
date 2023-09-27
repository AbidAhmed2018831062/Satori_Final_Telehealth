import React, { useEffect, useRef, useState } from 'react';
import image from "../../assets/images/image.png";
import { Box, Divider, Stack } from '@mui/material';
import UpcomingAppointments from './UpcomingAppointments';
import monthNames from '../../assets/js/monthNames';
import { baseURL } from '../../../config';

export default function NextAppointment({appointment,setPage,setCareProvider,setEventDetails}){
    const [height, setHeight] = useState(0);
    const elementRef = useRef(null);
    useEffect(() => {
      console.log(elementRef.current.offsetHeight)
      setHeight(elementRef.current.offsetHeight);
    }, []);
  
    const dates=["Sunday, Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    return(<Stack direction="row" ref={elementRef}sx={{padding:"20px",borderRadius: "22px",justifyContent:"space-between",alignItems:'center',
    border:" 1.1px solid var(--grey, #777)"}}>
        <Box sx={{flex:8}}>
          <Stack direction="row" sx={{alignItems:'center',gap:"20px",marginBottom:"30px"}}>
              <Box>
                <img src={appointment.careProviderImages?`${baseURL}/images/${appointment.careProviderImages}`:image} style={{width:"90px",height:"90px",borderRadius:"50%"}}/>
              </Box>
              <Box>
                <p style={{fontSize:"20px",fontWeight:"bold",marginBottom:"0px",marginTop:"0px"}}>{appointment.careProviderName}</p>
                {/* <p style={{fontSize:"20px",fontWeight:"normal",marginTop:"0px"}}>25 years old</p> */}
              </Box>
          </Stack>
          <Box>
         
            <Stack direction="row" sx={{alignItems:'center',gap:"50px",marginBottom:"30px"}}>
              <Box>   <p style={{marginBottom:"0px"}}>Date</p>
              <Box sx={{borderRadius: "20px",
    background: "var(--secondary-color, #EBE5DE)",padding:"10px 20px"}}>
      <p style={{margin:"0px"}}>{dates[new Date(appointment.start_time).getDay()]}, {new Date(appointment.start_time).getDate()} {monthNames(new Date(appointment.start_time).getMonth())} {new Date(appointment.start_time).getFullYear()}</p>
    </Box>
    </Box>
    <Box>   <p style={{marginBottom:"0px"}}>Time</p>
              <Box sx={{borderRadius: "20px",
    background: "var(--secondary-color, #EBE5DE)",padding:"10px 20px"}}>
      <p style={{margin:"0px"}}>    {new Date(appointment.start_time).getHours()}:{new Date(appointment.start_time).getMinutes()}- {new Date(new Date(appointment.start_time).getTime()+30*60*1000).getHours()}:{new Date(new Date(appointment.start_time).getTime()+30*60*1000).getMinutes()}</p>
    </Box>
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
    }}><a href={appointment.meetingLink} style={{color:"#fff",textDecoration:"none",padding:"0px",margin:"0px"}}>Start Session</a></button>
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
        setCareProvider(appointment.careProviderId);
        setPage(5);
        setEventDetails(appointment)
    }}>View Details</button>
        </Box>
        </Stack>)
}