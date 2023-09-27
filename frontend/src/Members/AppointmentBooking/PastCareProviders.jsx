import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Box, MenuItem, Select, Stack } from '@mui/material';
import monthNames from '../../assets/js/monthNames';
import { baseURL } from '../../../config';
import carep from "../../assets/images/carep.png";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ShowHead from './ShowHead';
import styled from '@emotion/styled';

const Item = styled(Paper)(({ theme }) => ({
    borderRadius: "20px",
    background: "var(--primary-color, #62C227)",
  padding: "20px 50px",
  textAlign: 'start',
}));
function PastCareProviders({upcomingAppointments,type,})
{
  const dates=["Sunday, Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const items=[
    {label:"This Week",value:"week"},
    {label:"This Month",value:"month"},
    {label:"Today",value:"today"},

] ;
const [pastcareproviders,setPastCareProviders]=useState([]);
useEffect(()=>{
    axios.get(`${baseURL}/members/getcareproviders?id=${Cookies.get("memberId")}`).then(res=>{
        console.log(res);
        setPastCareProviders(res.data)
    }).catch(err=>console.log(err))
},[])
const [value,setValue]=useState("week");
const unmatch=(careid)=>{
    axios.put(`${baseURL}/members/unmatch`,{
      memberId:Cookies.get("memberId"),
      careId:careid
    }).then(res=>{console.log(res);
    window.location.reload()}).catch(err=>console.log(err))
}
return(
    <div style={{marginTop:"30px"}}>
       {pastcareproviders.length>0&&<Box>
        <h3 style={{fontSize:"35px"}}>Your Care Providers</h3>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {pastcareproviders.map((care, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <Item>
                <Box>
                    <ShowHead careprovider={care}/>
                    <NavLink to={`/member/showprovider/${care._id}`}>
                      <button style={{color:"var(--primary-color, #62C227)",background:"white",width:"100%",marginTop:"20px"}}>Book Session</button>
                      </NavLink>
                      <p style={{color:"#fff",textDecoration:"underline",textAlign:"center",cursor:"pointer"}} onClick={e=>unmatch(care._id)}>Unmatch</p>
                      </Box></Item>
          </Grid>
        ))}
      </Grid>
        
        </Box>}
    </div>
)
}

export default PastCareProviders;