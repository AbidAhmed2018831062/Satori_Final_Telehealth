import * as React from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import { Stack } from '@mui/material';
import { baseURL } from '../../../config';
import carep from "../../assets/images/carep.png";
import { NavLink, Navigate } from 'react-router-dom';
import ShowHead from './ShowHead';

const Item = styled('div')(({ theme }) => ({
  backgroundColor:  '#fff',
  borderRadius: "20px",
  border: "1px solid var(--grey, #777)",
  padding: "20px 30px",
  borderRadius: '20px',
  textAlign: 'start',
}));

export default function CareProviderCards({allCareProviders}) {
    const [navigate,setNavigate]=React.useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
       
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {allCareProviders.map((careprovider, index) => (
          <Grid xs={2} sm={4} key={index}>

            <Item>
                <Box>
              
                  <ShowHead careprovider={careprovider}/>
                   <p>{careprovider.bio?careprovider.bio:"Lorem Ispum"}</p>
                   <Stack direction="row">
                    <Box sx={{flex:1}}></Box>
                    <Box sx={{textAlign:"end",cursor:"pointer"}} onClick={e=>setNavigate(true)}>
                      <NavLink to={`/member/showprovider/${careprovider._id}`}>
                      <span style={{color:"var(--primary-color, #62C227)",textDecoration:"underline"}}>View Details</span>
                      </NavLink>
                      
                    </Box>
                   </Stack>
                </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}