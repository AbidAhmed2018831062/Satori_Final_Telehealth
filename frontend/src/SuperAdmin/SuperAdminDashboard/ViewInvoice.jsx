import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseURL } from '../../../config';
import BasicTable from './SuperAdminData';
import { Box, InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CreateInvoice from './CreateInvoice';
function ViewInvoice()
{
    const [value,setValue]=useState("companyName");
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get(`${baseURL}/superadmin/allinvoices`).then(res=>{
            console.log(res);
            let rows=res.data;
           
            setData(rows);
        }).catch(err=>console.log(err))
    },[]);
    const enntries=[{
        label:"Company Name",value:"companyName"
    },
    {
        value:"slots",label:"Slots Purchased"
    },
    {
        value:"members",label:"Members"
    },
    {
        value:"subscription",label:"Subscription"
    },
    {
        value:"dateStart",label:"Onboarding Date"
    }
    ]

    const [open, setOpen] = React.useState(false);
    const handleOpen = (ro) => {
  
      setOpen(true)};
    const handleClose = () => setOpen(false);
    return(
    <div>
      <button style={{backgroundColor:"#1aae9f",padding:"10px 20px",color:"white",borderRadius:"20px",textAlign:"center",display:"block",width:"150px"}}onClick={handleOpen}>Create Invoice</button>
       {open&&<CreateInvoice open={open}handleClose={handleClose}handleOpen={handleOpen}/>}
        <Box sx={{padding:"50px",margin:"20px auto",backgroundColor:"white"}}>
     {data.length>0&&  <BasicTable head={[{value:"Id",label:"invoiceId"},{value:"Admin Id",label:"adminId"},{value:"Name",label:"name"},{value:"Hours Sponsored",label:"hours"},{value:"Issue Date",label:"created",},{value:"Total",label:"total",},{value:"Status",label:"status",}]} rows={data} type={"invoice"}/>}
     </Box>
    </div>
)
}

export default ViewInvoice;