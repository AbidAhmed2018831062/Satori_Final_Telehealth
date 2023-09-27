import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseURL } from '../../../config';
import BasicTable from './SuperAdminData';
import { Box, InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
function CareProviderData()
{
    const [value,setValue]=useState("firstName");
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get(`${baseURL}/superadmin/allcareproviders`).then(res=>{
            console.log(res);
            let rows=res.data;
            rows.sort(function (a, b) {
                if (a.firstName < b.firstName) {
                  return -1;
                }
                if (a.firstName > b.firstName) {
                  return 1;
                }
                return 0;
              });
              console.log(rows);
            setData(rows);
        }).catch(err=>console.log(err))
    },[]);
    const enntries=[{
        label:"Full Name",value:"firstName"
    },
    {
        value:"email",label:"Email Addresses"
    },
    {
        value:"hours",label:"Hours Completed"
    },
    {
        value:"onboardDate",label:"Onboarding Date"
    },
   
    ]
    const [search,setSearch]=useState("");
    const sortData=(type)=>{
        let rows=[...data];
        rows.sort(function (a, b) {
            if(type==="hours"){
                if (a[type] < b[type]) {
                    return 1;
                  }
                  if (a[type] > b[type]) {
                    return -1;
                  }
                  return 0;
              
               
            }
            else if(type==="onboardDate")
            {
                console.log(type)
                if (new Date(a[type]) < new Date(b[type])) {
                    return -1;
                  }
                  if (new Date(a[type]) >new Date(b[type])) {
                    return 1;
                  }
                  return 0;
            }
            else if(type==="email"){
                if (a[type] < b[type]) {
                  return type==="email"?-1:1;
                }
                if (a[type] > b[type]) {
                  return type==="email"?1:-1;
                }
                return 0;
            }
            else{
            if (a[type] < b[type]) {
              return type==="firstName"?-1:1;
            }
            if (a[type] > b[type]) {
              return type==="firstName"?1:-1;
            }
            return 0;
        }
          });
         return rows
        }
    const handleChangeValue=(e)=>{
        const change=e.target.value;
        if(e.target.value==="firstName")
        {
              
              setData(sortData("firstName"));
            setValue(change);

        }
        else if(e.target.value==="hours")
        {
            setData(sortData("hours"));
            setValue(change);

        }
        else if(e.target.value==="onboardDate")
        {
            setData(sortData("onboardDate"));
            setValue(change);

        }
        else if(e.target.value==="email")
        {
            setData(sortData("email"));
            setValue(change);

        }
        
    }
return(
    <div style={{backgroundColor: 'rgb(195, 207, 217)',}}>
        <Stack direction="row" sx={{justifyContent:'space-between',alignContent:"center",gap:"30px"}}>
        <TextField
        id="search"
        type="search"
        label="Search"
        value={search}
        onChange={e=>setSearch(e.currentTarget.value)}
        sx={{borderRadius: "30px",
            background: " #EBE5DE",
            border:"none", "& fieldset": { border: 'none' },
             }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Stack direction="row" sx={{gap:"10px"}}>
        <p>Sort BY..</p>
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={value}
    sx={{padding:"0px 20px"}}
   
    onChange={handleChangeValue}
  >
  {enntries.map(e=>{
    return (<MenuItem key={e}value={e.value}>{e.label}</MenuItem>)
  })}
  </Select>
      </Stack>
        </Stack>
        <Box sx={{padding:"50px",margin:"20px auto",backgroundColor:"white"}}>
     {data.length>0&&  <BasicTable head={[{value:"Full Name",label:"name"},{value:"Email Address",label:"email"},{value:"Hours Completed",label:"hours"},{value:"Onboarding Date",label:"onboardDate"}]} rows={data} type={"careprovider"}/>}
     </Box>
    </div>
)
}

export default CareProviderData;