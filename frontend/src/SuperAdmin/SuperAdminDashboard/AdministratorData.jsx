import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseURL } from '../../../config';
import BasicTable from './SuperAdminData';
import { Box, InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
function AdministratorData()
{
    const [value,setValue]=useState("companyName");
    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get(`${baseURL}/superadmin/getadministrators`).then(res=>{
            console.log(res);
            let rows=res.data;
            rows.sort(function (a, b) {
                if (a.companyName < b.companyName) {
                  return -1;
                }
                if (a.companyName > b.companyName) {
                  return 1;
                }
                return 0;
              });
              console.log(rows);
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
    const [search,setSearch]=useState("");
    const sortData=(type)=>{
        let rows=[...data];
        rows.sort(function (a, b) {
            if(type==="members"){
                if (a[type].length < b[type].length) {
                    return 1;
                  }
                  if (a[type].length > b[type].length) {
                    return -1;
                  }
                  return 0;
              
               
            }
            else if(type==="dateStart")
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
            else{
            if (a[type] < b[type]) {
              return type==="companyName"?-1:1;
            }
            if (a[type] > b[type]) {
              return type==="companyName"?1:-1;
            }
            return 0;
        }
          });
         return rows
        }
    const handleChangeValue=(e)=>{
        const change=e.target.value;
        if(e.target.value==="companyName")
        {
              
              setData(sortData("companyName"));
            setValue(change);

        }
        else if(e.target.value==="slots")
        {
            setData(sortData("slots"));
            setValue(change);

        }
        else if(e.target.value==="members")
        {
            setData(sortData("members"));
            setValue(change);

        }
        else if(e.target.value==="subscription")
        {
            setData(sortData("subscription"));
            setValue(change);

        }
        else if(e.target.value==="dateStart")
        {
            setData(sortData("dateStart"));
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
     {data.length>0&&  <BasicTable head={[{value:"Company Name",label:"companyName"},{value:"Slots Purchased",label:"slots"},{value:"Members",label:"members"},{value:"Subscription",label:"subscription"},{value:"Onboarding Date",label:"dateStart"}]} rows={data} type={"admin"}/>}
     </Box>
    </div>
)
}

export default AdministratorData;