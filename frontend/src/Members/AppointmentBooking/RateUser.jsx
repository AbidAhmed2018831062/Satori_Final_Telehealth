import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {baseURL} from "../../../config";
import { Box, Rating } from "@mui/material";
import styled from "@emotion/styled";
import Navbar from "../../Common/Navbar";
export default function RateUSer(){
    const {id}=useParams();
    const [event,setEvent]=useState({});
    const [value, setValue] = React.useState(0);
    const [feedback, setFeedback] = React.useState("");
    const [navigate, setNavigate] = React.useState(false);

const StyledRating = styled(Rating)({
    color:"rgba(98, 194, 39, 1)",
    '& .MuiRating-iconFilled': {
      color: 'rgba(98, 194, 39, 1)',
    },
    '& .MuiRating-iconHover': {
      color: 'rgba(98, 194, 39, 1)',
    },
  });
    useEffect(()=>{
        axios.get(`${baseURL}/members/getuserevent?id=${id}`).then(result=>{
            console.log(result)
            setEvent(result.data);
        }).catch(err=>console.log(err))
    },[]);
    const submit=()=>{
        axios.post(`${baseURL}/members/createreview`,{
            eventId:event._id,
            email:event.email,
            careProviderId:event.careProviderId,
            careProviderName:event.careProviderName,
            careProviderImage:event.careProviderImage,
            rating:value,
            feedback:feedback
        }).then(res=>{console.log(res);
        setNavigate(true)
        }).catch(err=>console.log(err))
    }
  return (
    <Box>
        <Navbar/>
        {Object.keys(event).length>0&&<Box sx={{width:"45%",margin:"60px auto"}}>
            {navigate&&<Navigate to="/member"></Navigate>}
            <h3 style={{fontSize:"35px"}}>How was your session?</h3>
        <div style={{color:"",textAlign:"center"}}> <StyledRating
        name="customized-color"
        
        value={value}
        size="large"
        sx={{color: 'rgba(98, 194, 39, 1)',fontSize:"50px",
    }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /></div>
      <p style={{fontWeight:"bold"}}>Let us know what you think.</p>
      <p>We’d love to hear your feedback to help us improve.</p>
      <textarea rows={10} style={{width:"75%",background:"white",color:"black",padding:"20px",borderRadius:"20px",margin:"20px auto",display:"block"}} value={feedback}onChange={e=>setFeedback(e.currentTarget.value)}/>
     
            <button onClick={submit} style={{backgroundColor:"#62C227",color:"white",padding:"15px 55px",marginTop:"30px"}}>Submit</button>
           
        </Box>
        
        }
    </Box>
  )
}