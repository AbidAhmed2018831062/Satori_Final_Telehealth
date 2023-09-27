import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { baseURL } from "../../../config";
import { Box, Stack } from "@mui/material";
import Navbar from "../../Common/Navbar";
import ShowCareProviderDetail from "./ShowCareProviderDetail";
import Calendly from "./CalendlyConnect";
import BookingConfirm from "./BookingConfirm";
import StripePayment from "../../Administrator/Payment/StripePayment";

export default function BookAppointment(){
    const {id}=useParams();
    const [careprovider,setCareProvider]=useState({});
    useEffect(()=>{
       axios.get(`${baseURL}/careprovider/getcareprovider?id=${id}`).then(res=>{
        console.log(res);
        setCareProvider(res.data);
       }).catch(err=>console.log(err))
    },[]);
    // useEffect( () => {
    //     const handleTabClose = (event) => {
    //       event.preventDefault();
    
    //       console.log('beforeunload event triggered');
    //       if(payload.event){
    //     axios.post(`${baseURL}/members/cancelevent`,{
    //         uuid:payload.event.uri
    //       })}
    //       return (event.returnValue =
    //         'Are you sure you want to exit?');
    //     };
    
    //     window.addEventListener('beforeunload', handleTabClose);
    
    //     return () => {
    //       window.removeEventListener('beforeunload', handleTabClose);
    //     };
    //   }, []);
    const [payload,setPayload]=useState({})
    const [bookingsuccesful,setBookingSuccessful]=useState(false);
return (
    <div>
          <Navbar/>
          
        {Object.keys(careprovider).length>0&&!bookingsuccesful&&<Box sx={{width:"75%",margin:"50px auto"}}>
           
         
           <Stack direction="row" sx={{justifyContent:'space-between',marginTop:"30px",}} spacing={3}>
            <ShowCareProviderDetail careprovider={careprovider}/>
            <Calendly careprovider={careprovider} payload={payload}setPayload={setPayload}bookingsuccesful={bookingsuccesful}setBookingSuccessful={setBookingSuccessful}/>
           </Stack>
           </Box>}
           {bookingsuccesful&&<Box>
  <StripePayment careprovider={careprovider} payload={payload}setPayload={setPayload}bookingsuccesful={bookingsuccesful}setBookingSuccessful={setBookingSuccessful} type="member"/>
  </Box>}

    </div>
)
}