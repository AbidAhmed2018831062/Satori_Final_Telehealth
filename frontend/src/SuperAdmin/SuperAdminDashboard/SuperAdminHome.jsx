import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseURL } from "../../../config";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function SuperAdminHome()
{
    const [data,setData]=useState([]);
useEffect(()=>{
  axios.get(`${baseURL}/superadmin/getcount`).then(result=>{
    console.log(result);
    setData([{text:"Administrators",value:result.data.totalAdmin},
    {text:"Care Providers",value:result.data.careProviders},
    {text:"Slots Purchased",value:result.data.totalSlots},
    {text:"Members",value:result.data.totalMembers},
    {text:"Sponsored Hours",value:result.data.totalSponsoredHours},
    {text:"Hours Completed",value:result.data.hoursCom},

    ])
  }).catch(err=>console.log(err))
},[])
return(
    <div>
        <Box sx={{width:"35%"}}>
    {data.length>0&&  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 8 }}>
  {data.map((mainData, index) => (
    <Grid item xs={2} sm={4} md={4} key={index}>
      <Item>
          <p >{mainData.value}</p>
          <p >{mainData.text}</p>
      </Item>
    </Grid>
  ))}
</Grid>}
</Box>
    </div>
)
}

export default SuperAdminHome;