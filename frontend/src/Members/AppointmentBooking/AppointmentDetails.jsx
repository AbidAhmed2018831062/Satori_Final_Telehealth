import { Box, Divider, Stack } from "@mui/material";
import ShowCareProviderDetail from "./ShowCareProviderDetail";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../config";
import AppointmentSchedule from "./AppointmentSchedule";

export default function AppointmentDetails({careProvider,profile,eventDetails,events,}){
    const [bookedCareProvider,setBookedCareProvider]=useState({});
    const [height, setHeight] = useState(0);
    const elementRef = useRef(null);
    // useEffect(() => {
    //   console.log(elementRef.current.offsetHeight)
    //   setHeight(elementRef.current.offsetHeight);
    // }, []);
  
    useEffect(()=>{
        axios.get(`${baseURL}/careprovider/profile?id=${careProvider}`,).then(result=>{
            console.log(result.data);
            setBookedCareProvider(result.data);
        
        }).catch(err=>console.log(err));
     },[])
    return(
    
    <Box>
{Object.keys(bookedCareProvider).length>0&&<Stack direction="row" sx={{justifyContent:'space-between',marginTop:"30px",}} spacing={3}>
            <Box ref={elementRef} sx={{flex:2}}><ShowCareProviderDetail careprovider={bookedCareProvider} type={'next'}/></Box>
            {height!=0&&  <Box sx={{flex:1,height:height}}>
      <Divider  orientation="vertical" sx={{height:height,}}></Divider>
        </Box>}
            <AppointmentSchedule eventDetails={eventDetails}careprovider={bookedCareProvider}profile={profile}/>
           </Stack>}
    </Box>)
}