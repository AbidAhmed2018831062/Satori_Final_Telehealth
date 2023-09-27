import React, { useEffect, useState } from 'react';
import logo from "../assets/images/logo.png";
import dash from "../assets/images/dash.png"
import chat from "../assets/images/chat.png";
import { Box } from '@mui/material';
import whitedash from "../assets/images/whitedash.png";
import past from "../assets/images/past.png";

function UserDashboardSideBar({page,setPage,type})
{
const height=  window.innerHeight
    const [buttons,setButtons]=useState([]);
    useEffect(()=>{
       setButtons( [{
            image:<img src={page===0?whitedash:dash} style={{width:"30px"}}/>,
            title:"Dashboard"
        },
        {
            image:<img src={page===1?chat:chat} style={{width:"30px"}}/>,
            title:"Chat"
        },
        {
            image:<img src={page===2?past:past} style={{width:"30px"}}/>,
            title:"Past Appointments"
        }
        
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
       
        
          
         </div>)
}

export default UserDashboardSideBar;