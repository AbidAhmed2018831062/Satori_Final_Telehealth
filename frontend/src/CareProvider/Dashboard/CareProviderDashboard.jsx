import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/logo.png";
import dash from "../../assets/images/dash.png"
import email from "../../assets/images/email.png"
import dollar from "../../assets/images/dollar.png"
import { Avatar, Box, Divider, Drawer, InputAdornment, List, ListItem, Menu, MenuItem, Select, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import Cookies from 'js-cookie';
import admin from "../../assets/images/admin.png";
import { NavLink, Navigate } from 'react-router-dom';

import monthNames from '../../assets/js/monthNames';
import { baseURL } from "../../../config.js";
import randomImage from  "../../assets/images/randomimage.png";
 
import { Cookie, Email } from '@mui/icons-material';

import UserDashboardSideBar from '../../Common/UserDashboardSideBar';
import CareProviderFirstPage from './CareProviderFirstPage';
import CompleteProfile from '../../Common/CompleteProfile';
import UpdateUserPassword from '../../Common/UpdateUserPassword';
import LogOutModal from '../../Administrator/Dashboard.jsx/LogOutModal';
import MemberAppointmentDetails from '../MemberAppointmentDetails/MemberAppointmentDetails';
import UpcomingAppointments from './UpcomingAppointments';
import PaymentHistory from './PaymentHistory';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const height=  window.innerHeight
function CareProviderDashboard()
{
    const [event,setEvent]=useState({});
    const [open2,setOpen2]=useState(false);
    const handleOpen=()=>{
        setOpen2(true);
    }
    const handleClose2=()=>{
        setOpen2(false);
    }
 const [profile,setProfile]=useState({});
 const [allEvents,setAllEvents]=useState([]);
 const [showEvent,setShowEvent]=useState(false);
 const [pastEvents,setPastEvents]=useState([]);
 useEffect(()=>{
    axios.get(`${baseURL}/careprovider/allevents?id=${Cookies.get("careId")}`).then(res=>{
        console.log(res);
        setAllEvents(res.data.upcomingAppoints);
        setPastEvents(res.data.pastAppoints);
        setShowEvent(true);
    }).catch(err=>console.log(err))
 },[])
 useEffect(()=>{
    axios.get(`${baseURL}/careprovider/profile?id=${Cookies.get("careId")}`,).then(result=>{
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
];
function age(birthdate) {
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() - 
               (today.getMonth() < birthdate.getMonth() || 
               (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age;
  }
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

       <UserDashboardSideBar page={page}setPage={setPage} type="care"/>
        </Drawer>
            </div>
            </Box>
    <div ></div>
   <div style={{flex:24,paddingRight:"20px",height:"100%",overflowY:"auto",width:"85%",margin:"0px auto"}}>
   <div style={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
            <p style={{fontWeight:600,fontSize:"20px"}}>{page===0?"Dashboard":page===1?"Invite Members":page===2?"Past Appointments":page===3?"Edit Profile":page===5?"Appointment Details":page===6?"Payment History":"Change Password"}</p>
          {profile.images?<img src={`${baseURL}/images/${profile.images}`} style={{width:"70px",height:"70px",borderRadius:"50%"}} id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}/>:<img src={randomImage} style={{width:"70px",height:"70px"}}id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined} onClick={handleClick}/>}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{padding:"10px",borderRadius:"500px"}}
      >
        <MenuItem onClick={handleClose} sx={{margin:"0px"}}>
            <div style={{margin:"0px"}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:"10px",width:"100%",alignItems:"center",margin:"0px"}}>
        <img src={profile.images?`${baseURL}/images/${profile.images}`:randomImage} style={{display:"block",width:"50px",height:"50px",borderRadius:"50%"}}/>
                <div style={{marginTop:"-20px"}}>
                    <h4 style={{marginBottom:"0px"}}>{profile.firstName+" "+profile.lastName}, {profile.degree}</h4>
                    {/* <p style={{marginTop:"0px"}}>{profile.specializations}</p> */}
                </div>
        
                </div>
            </div>
       
        </MenuItem>
        <MenuItem sx={{margin:"0px"}}>        <hr style={{width:"100%",backgroundColor:"rgba(206, 206, 206, 1)",margin:"0px"}}></hr> </MenuItem>
        <MenuItem onClick={handleCloseEdit} sx={{marginBottom:"10px",fontWeight:"bold"}}><p style={{margin:"0px"}}>Edit Profile</p></MenuItem>
        <MenuItem onClick={handlePassword}  sx={{marginBottom:"10px",fontWeight:"bold"}}><div style={{margin:"0px",width:"100%"}}>
            <p style={{margin:"0px"}}>Change Password</p>
          
        </div></MenuItem>
        
        <MenuItem onClick={e=>setPage(6)}  sx={{marginBottom:"10px",fontWeight:"bold"}}><div style={{margin:"0px",width:"100%"}}>
            <p style={{margin:"0px"}}>Payment History</p>
          
        </div></MenuItem>
        <MenuItem onClick={e=>setOpen2(true)}  sx={{marginBottom:"10px",fontWeight:"bold"}}><div style={{margin:"0px",width:"100%",}}><hr style={{width:"100%",backgroundColor:"rgba(206, 206, 206, 1)"}}></hr><p style={{color:"red",margin:"0px",marginTop:"20px"}}>Log Out</p></div></MenuItem>

      </Menu>
        </div>
        {open2&&<LogOutModal open={open2}handleClose={handleClose2} type={"cp"}/>}

        {/* {open2&&<LogOutModal open={open2}handleClose={handleClose2}/>} */}
        {page===0&&showEvent&&<CareProviderFirstPage profile={profile} pastAppoints={pastEvents}events={allEvents} setEvent={setEvent}setPage={setPage} age={age}/>}
        {page===2&&showEvent&&<UpcomingAppointments profile={profile} upcomingAppointments={pastEvents}events={allEvents} setEvent={setEvent}setPage={setPage} age={age}/>}
        {page===3&&<CompleteProfile type={"care"} nav={true} age={age}/>}
        {page===4&&<UpdateUserPassword type={"care"} nav={true} age={age}/>}
        {page===5&&<MemberAppointmentDetails type={"care"} nav={true} event={event} age={age}/>}
        {profile.payments&&page===6&&  <PaymentHistory head={[{value:"Payment Date",label:"paymentDate"},{value:"Description",label:"memberName"},{value:"Date and Time",label:"start_time"},{value:"Amount",label:"price"},{value:"Status",label:"status"}]} rows={profile.payments} type={"admin"}/>}

    </div>
    </div>}
    </div>
)
}

export default CareProviderDashboard;