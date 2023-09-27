import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/logo.png";
import dash from "../../assets/images/dash.png"
import email from "../../assets/images/email.png"
import dollar from "../../assets/images/dollar.png"
import { Avatar, Box, Divider, Drawer, InputAdornment, List, ListItem, Menu, MenuItem, Select, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import SendInvitation from './SendInvitation';
import axios from 'axios';
import Cookies from 'js-cookie';
import admin from "../../assets/images/admin.png";
import { NavLink, Navigate } from 'react-router-dom';
import DataTable from './MemberTable';
import EnhancedTable from './MemberTable';
import ManageSubscription from './ManageSubscription/ManageSubscription';
import EditProfile from './EditProfile';
import InviteMembers from '../Payment/InviteMembers';
import UpdatePassword from './UpdatePassword';
import monthNames from '../../assets/js/monthNames';
import LogOutModal from './LogOutModal';
import { baseURL } from "../../../config.js";

import { Email } from '@mui/icons-material';
import SideBar from './SideBar';
import MemberData from './MemberData';
import ChangePayment from './ChangePayment';
import BeforePayment from './BeforePayment';
import Invoices from './Invoices';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const height=  window.innerHeight
function Dashboard()
{
    const [open2,setOpen2]=useState(false);
    const handleOpen=()=>{
        setOpen2(true);
    }
    const handleClose2=()=>{
        setOpen2(false);
    }
 const [profile,setProfile]=useState({});
 useEffect(()=>{
    axios.get(`${baseURL}/admin/profile?id=${Cookies.get("id")}`,).then(result=>{
        console.log(result.data);
        setProfile(result.data);
        Cookies.set("subscription",result.data.subscription,{expires:365})
        setSlots(result.data.slots);
    }).catch(err=>console.log(err));
 },[])
    const hours=[{
        title:"Total Hours Used",
        hours:"0 hours",
        mon:"Since 01 Aug"
    },
    {
        title:"Total Hours Used",
        hours:"0 hours",
        mon:"Since 01 Jan"
    },
    {
        title:"Total Hours Used",
        hours:"0 hours",
        mon:"Since 18 Aug"
    },

    ]

const enntries=[{
    label:"Latest",value:"latest"
},
{
    label:"Oldest",value:"oldest"
}
]
const [newDate,setNewDate]=useState(0)
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose=()=>{
    setAnchorEl(null);

}
const handleCloseEdit = () => {
    setPage(3)
};
const handlePassword = () => {
    setPage(4)
};
const [slots,setSlots]=useState();
const handleSlots2=(e)=>{
    setSlots(e);
};
const [search,setSearch]=useState("");
const handleSearchQuery=()=>{
    setSearch(e.currentTarget.value);
}
const [value,setValue]=useState("oldest")
const [page,setPage]=useState(0);
const [gotoPay,setgotoPaymentChange]=useState(false);
return(
    <div style={{overflow:"hidden"}}>
  {Object.keys(profile).length>0&&  <div style={{display:"flex",gap:"20px",textAlign:"start",marginTop:"20px"}}>
  <Box
        component="nav"
        sx={{ width: { sm: 250 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <div style={{flex:4,padding:"10px 20px"}}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
          open
        >
              {gotoPay&&<Navigate to="/admin/change/payment"></Navigate>}

       <SideBar page={page}setPage={setPage}/>
        </Drawer>
            </div>
            </Box>
    <div ></div>
   <div style={{flex:24,paddingRight:"20px",height:"100%",overflowY:"auto"}}>
   <div style={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
            <p style={{fontWeight:600,fontSize:"20px"}}>{page===0?"Dashboard":page===1?"Invite Members":page===2?"Manage Subscription":page===3?"Edit Profile":page===5?"Payment Details":page===6?"Payment History":"Change Password"}</p>
          {profile.images?<img src={`${baseURL}/images/${profile.images}`} style={{width:"70px",height:"70px",borderRadius:"50%"}} id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}/>: <Avatar
        sx={{ bgcolor: "#62C227",width:"70px",height:"70px" }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
{profile.companyName.substr(0,2)}
      </Avatar>}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{padding:"10px",borderRadius:"100px"}}
      >
        <MenuItem onClick={handleClose} sx={{margin:"0px"}}>
            <div style={{margin:"0px"}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:"10px",width:"100%",alignItems:"center",margin:"0px"}}>
        <img src={profile.images?`${baseURL}/images/${profile.images}`:admin} style={{display:"block",width:"50px",height:"50px",borderRadius:"50%"}}/>
                <div style={{margin:"0px"}}>
                    <h4 style={{marginBottom:"0px"}}>{profile.companyName}</h4>
                    <p style={{marginTop:"0px"}}>Active Members<br></br><span style={{fontWeight:"bold",}}> {profile.members.length}</span></p>
                </div>
        
                </div>
            </div>
       
        </MenuItem>
        <MenuItem sx={{margin:"0px"}}>        <hr style={{width:"100%",backgroundColor:"rgba(206, 206, 206, 1)",margin:"0px"}}></hr> </MenuItem>
        <MenuItem onClick={handleCloseEdit} sx={{marginBottom:"10px",fontWeight:"bold"}}><p style={{margin:"0px"}}>Edit Profile</p></MenuItem>
        <MenuItem onClick={handlePassword}  sx={{marginBottom:"10px",fontWeight:"bold"}}><div style={{margin:"0px",width:"100%"}}>
            <p style={{margin:"0px"}}>Change Password</p>
          
        </div></MenuItem>
        <MenuItem onClick={e=>setPage(5)}  sx={{marginBottom:"10px",fontWeight:"bold"}}><div style={{margin:"0px",width:"100%"}}>
            <p style={{margin:"0px"}}>Change Payment Details</p>
          
        </div></MenuItem>
        <MenuItem onClick={e=>setPage(6)}  sx={{marginBottom:"10px",fontWeight:"bold"}}><div style={{margin:"0px",width:"100%"}}>
            <p style={{margin:"0px"}}>Payment History</p>
          
        </div></MenuItem>
        <MenuItem onClick={e=>setOpen2(true)}  sx={{marginBottom:"10px",fontWeight:"bold"}}><div style={{margin:"0px",width:"100%",}}><hr style={{width:"100%",backgroundColor:"rgba(206, 206, 206, 1)"}}></hr><p style={{color:"red",margin:"0px",marginTop:"20px"}}>Log Out</p></div></MenuItem>

      </Menu>
        </div>
    
        {open2&&<LogOutModal open={open2}handleClose={handleClose2}/>}
        {page===0&&<div>   <h3 style={{marginTop:"20px",marginBottom:"20px",fontSize:"35px"}}>Overview</h3>
      {/* { profile.subscription===0&& <div style={{display:"flex",justifyContent:'space-between',alignItems:'center',backgroundColor:"#62C227",width:"85%",padding:"10px 20px",borderRadius:"10px"}}>
            <p style={{fontWeight:600,fontSize:"20px",color:"white"}}>Your {profile.cancelled?"plan":"Free Trial"} will end on {
                localStorage.getItem("plan")==="0"?new Date(new Date(profile.dateStart).setMonth(new Date().getMonth()+3)).getDate()+"/"+parseInt(new Date(new Date(profile.dateStart).setMonth(new Date().getMonth()+3)).getMonth()+1)+"/"+new Date(new Date(profile.dateStart).setMonth(new Date().getMonth()+3)).getFullYear():new Date(new Date(profile.dateStart).setMonth(new Date().getMonth()+12)).getDate()+"/"+parseInt(new Date(new Date(profile.dateStart).setMonth(new Date().getMonth()+3)).getMonth()+1)+"/"+new Date(new Date(profile.dateStart).setMonth(new Date().getMonth()+12)).getFullYear()
            }</p>
           <button style={{backgroundColor:"white",padding:"10px 25px",color:"#62C227"}} onClick={e=>setPage(2)}> Upgrade Plan</button>
        </div>} */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:'center',gap:"30px",width:"65%",marginTop:"20px"
}}>
   {hours.map((e,index)=>{
    return (
        <div key={e} style={{borderRadius: "20px",flex:1,
        border: "1px solid var(--grey, #777)",padding:"10px 20px",textAlign:'center',}}>
            <p style={{marginBottom:'20px',fontSize:"20px",color:" var(--primary-dark, #011F1E)" }}>{e.title}</p>
            <p style={{marginBottom:'20px',fontSize:"20px",fontWeight:"bold"}}><span style={{color:"#62C227",fontSize:"25px"}}>{e.hours}</span></p>
            <p style={{fontSize:'20px',fontWeight:"bold"}}>Since {index===0?"01 "+monthNames(new Date(profile.dateStart).getMonth()):index===1?new Date(profile.dateStart).getDate()+" "+monthNames(new Date(profile.dateStart).getMonth()):"01 Jan"} {new Date(profile.dateStart).getFullYear().toString().substring(2,4)}</p>
        </div>
    )
   })}
</div>
<h3 style={{marginTop:"40px",marginBottom:"20px"}}>Manage Members</h3>
<div style={{borderRadius: "20px",flex:1,
        border: "1px solid var(--grey, #777)",padding:"20px 35px",textAlign:'center',}}>
            <div style={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:"flex",justifyContent:'space-between',alignItems:'center',gap:"10px"}}>
                    <p style={{fontSize:"18px",fontWeight:"bold"}}>Show Entry</p>
                    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={value}
    sx={{padding:"0px 20px"}}
    label="Age"
    onChange={e=>{
      if(e.target.value==="latest")
      profile.members.reverse();
      else if(value==="latest"&&e.target.value==="oldest")
      profile.members.reverse();
      setValue(e.target.value)}}
  >
  {enntries.map(e=>{
    return (<MenuItem key={e}value={e.value}>{e.label}</MenuItem>)
  })}
  </Select>
                </div>
                <div  style={{display:"flex",justifyContent:'space-between',alignItems:'center',gap:"10px"}}>
              
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
              <SearchIcon onClick={handleSearchQuery}/>
            </InputAdornment>
          ),
        }}
      />
                </div>
               
            </div>
           {profile.members.length===0&& <p style={{fontSize:"20px",fontWeight:"bold",textAlign:'start',display:"inline-block",marginRight:'10px'}}>No members found</p>}
           {profile.members.length>0&&<MemberData head={[{value:"No",label:"no"},{value:"Name",label:"name"},{value:"Email",label:"email"},{value:"Start Date",label:"startDate"},{value:"Due Date",label:"dueDate"},{value:"Status",label:"status"},{value:"",label:"icon"}]} rows={profile.members} search={search}value={value}/>}
                <button style={{backgroundColor:"#62C227",padding:"10px 30px"}}onClick={e=>setPage(1)}>Add Members</button>
        </div>
    </div>}
    {page===1&&<InviteMembers slots={slots}handleSlots={handleSlots2} emails1={profile.members}/>}
    {page===2&&<ManageSubscription slots={slots}handleSlots={handleSlots2} profile={profile} />}
    {page===3&&<EditProfile slots={slots}handleSlots={handleSlots2} profile={profile} />}
    {page===4&&<UpdatePassword slots={slots}handleSlots={handleSlots2} profile={profile} />}
    {page===5&&<BeforePayment profile={profile} />}
    {page===6&&<Invoices profile={profile} />}

    </div>
    </div>}
    </div>
)
}

export default Dashboard;