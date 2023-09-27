import { Box, Divider, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../config";
import { useParams } from "react-router-dom";
import AppointmentSchedule from "../../Members/AppointmentBooking/AppointmentSchedule";
import ShowAllDetails from "./ShowAllDetails";
export default function MemberAppointmentDetails({event}){
    console.log(event)
    const [height, setHeight] = useState(0);
    const elementRef = useRef(null);
  
    // useEffect(()=>{
    //     axios.get(`${baseURL}/careprovider/getevent?id=${id}`,).then(result=>{
    //         console.log(result.data);
    //         setEvent(result.data);
        
    //     }).catch(err=>console.log(err));
    //  },[])
    return(
    
    <Box>
{Object.keys(event).length>0&&<Stack direction="row" sx={{justifyContent:'space-between',marginTop:"30px",}} spacing={3}>
            <Box ref={elementRef} sx={{flex:2}}><ShowAllDetails event={event} type={'next'}/></Box>
            {height!=0&&  <Box sx={{flex:1,height:height}}>
      <Divider  orientation="vertical" sx={{height:height,}}></Divider>
        </Box>}
            <AppointmentSchedule eventDetails={event} type="care"/>
           </Stack>}
    </Box>)
}