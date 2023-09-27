import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SuperAdminMenu from './SuperAdminMenu';
import logo from "../../assets/logo.png";
import SuperAdminHome from './SuperAdminHome';
import AdministratorData from './AdministratorData';
import ViewInvoice from './ViewInvoice';
import CareProviderData from './CareProviderData';
import AllMembersData from './AllMembersData';
import AppointmentData from './AppointmentData';
function SuperAdminDashboard()
{
    const [height, setHeight] = useState(0);
  const elementRef = useRef(null);

 

    const [page,setPage]=useState(0);
return(
    <div style={{height:"100vh"}}>
      <Stack direction="row" sx={{justifyContent:"space-between",gap:"20px",height:"100%"}}>
        <Box flex={4}>
        <img src={logo} style={{width:"127px",height:"27px",marginBottom:"15px",cursor:"pointer",margin:"15px auto"}}/>

            <SuperAdminMenu page={page} setPage={setPage}></SuperAdminMenu>
        </Box>
        <Box sx={{flex:24,padding:"40px",margin:"0px",backgroundColor:"rgb(195, 207, 217)",height:"100vh"}}>
            {page===0&&<SuperAdminHome/>}
            {page===1&&<AdministratorData/>}
            {page===2&&<AllMembersData/>}
            {page===3&&<CareProviderData/>}
            {page===5&&<ViewInvoice/>}
            {page===4&&<AppointmentData/>}

        </Box>
      </Stack>
    </div>
)
}

export default SuperAdminDashboard;