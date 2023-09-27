import React, { useEffect, useState } from 'react';
import logo from "../../assets/images/logo.png";
import dash from "../../assets/images/dash.png"
import email from "../../assets/images/email.png"
import dollar from "../../assets/images/dollar.png";
import whitedash from "../../assets/images/whitedash.png";
import emailwhite from "../../assets/images/emailwhite.png";
import { Avatar, Box, Divider, Drawer, InputAdornment, List, ListItem, Menu, MenuItem, Select, Stack, TextField } from '@mui/material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';import { Email } from '@mui/icons-material';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const height=  window.innerHeight
//md-EVjZ4bN9pICqj3s5hH6Czw\
//cesgawldggrfkjai
const SideBar = ({page,setPage})=>{
    const [buttons,setButtons]=useState([]);
    useEffect(()=>{
       setButtons( [{
            image:<img src={page===0?whitedash:dash} style={{width:"30px"}}/>,
            title:"Dashboard"
        },
        {
            image:<img src={page===1?emailwhite:email} style={{width:"30px"}}/>,
            title:"Invite Members"
        },
        // {
        //     image:<MonetizationOnIcon sx={{color:page===2?"white":"black"}}/>,
        //     title:"Manage Subscription"
        // }
        
        ]);
    },[page])
    return ( <div style={{height:height-100}}>
   
        <Box sx={{height:(height-150)*2/3,padding:"14px"}}>
                 <img src={logo} onClick={e=>setPage(0)} style={{width:"127px",height:"27px",cursor:"pointer",marginTop:"20px",marginBottom:"40px"}}/>
           
          {buttons.length>0&&   <div>
                 {buttons.map((e,index)=>{
                    
                     return(
                         <div key={e} style={{cursor:"pointer",display:"flex",gap:"10px",alignItems:'center',backgroundColor:page===index?"#62C227":"white",padding:"5px 10px",borderRadius:"10px",color:page===index?"white":"black"}} onClick={e=>setPage(index)}>
                           {e.image}
                             <p style={{fontSize:"16px",fontWeight:600,color:page===index?"white":"black"}}>{e.title}</p>
                         </div>
                     )
                 })}
         </div>}
         </Box>
         <Box sx={{flex:1,padding:"14px"}}>
             <hr style={{width:"100%"}}></hr>
             <h3 style={{fontSize:"20px",fontWeight:700,marginTop:"10px",marginBottom:"10px"}}>Contact Us</h3>
             <div style={{cursor:"pointer",display:"flex",gap:"10px",alignItems:'center',}} >
                             <Email/>
                             <p style={{fontSize:"16px",fontWeight:400}}><a href="mailto:hello@talkwithsatori.com" style={{fontStyle:"none",color:"black"}}>hello@talkwithsatori.com</a></p>
                         </div>
         </Box>
        
          
         </div>)
}
   

  export default SideBar;