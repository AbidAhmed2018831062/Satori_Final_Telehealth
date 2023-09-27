import { Box } from '@mui/material';
import React from 'react';

function SuperAdminMenu({page,setPage})
{
const menu=[
    "Home","Administrators","Members","Care Providers","Appointments","Invoices","Payouts"
]
return(
    <div>
       {menu.map((e,index)=><Box key={e} sx={{padding:"20px",marginBottom:"0px",marginTop:"0px",paddingBottom:"0px",cursor:"pointer"}} onClick={()=>setPage(index)}><p style={{fontWeight:600,marginBottom:"0px",fontSize:"16px",textAlign:"start",fontFamily:"Nunito"}}>{e}</p></Box>)}
    </div>
)
}

export default SuperAdminMenu;