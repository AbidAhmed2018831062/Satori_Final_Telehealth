import { Avatar, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import admin from "../assets/images/admin.png";
import { NavLink } from 'react-router-dom';
import dash from "../assets/images/dash.png";
import email from "../assets/images/email.png";
import dollar from "../assets/images/dollar.png";
import { baseURL } from '../../config';
function UpdateUserPassword({type})
{
    const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
    const [profile,setProfile]=useState({});
    useEffect(()=>{
      if(type==="member"){
        axios.get(`${baseURL}/members/profile?id=${Cookies.get("memberId")}`,).then(result=>{
          console.log(result.data);
          setProfile(result.data);
      }).catch(err=>console.log(err));
      }
       else if(type==="care"){
       axios.get(`${baseURL}/careprovider/profile?id=${Cookies.get("careId")}`,).then(result=>{
           console.log(result.data);
           setProfile(result.data);
       }).catch(err=>console.log(err));
    }
    },[type])
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
       const buttons=[{
        image:dash,
        title:"Dashboard"
    },
    {
        image:email,
        title:"Invite Members"
    },
    {
        image:dollar,
        title:"Manage Subscription"
    }
    
    ];
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const [passwords,setPasswords]=useState({old:"",newP:"",cNewP:""});
  const submit=(e)=>{
    e.preventDefault();
    setError(false);
    if(type==="member")
    {
      axios.post(`${baseURL}/members/updatepassword`,{
        old:passwords.old,
        newP:passwords.newP,
        memberId:Cookies.get("memberId")
      }).then(res=>{
        console.log(res);
        setSuccess(true);
      }).catch(err=>setError(true))
    }
 else{ axios.put(`${baseURL}/careprovider/updatepassword`,{
    old:passwords.old,
    newP:passwords.newP,
    id:Cookies.get("careId")
  }).then(res=>{
    console.log(res);
    setSuccess(true);
  }).catch(err=>setError(true))}
  };
  const [passMatch,setPassMatch]=useState(true);
  const handlePasswordChange=(e)=>{
    setPasswords({...passwords,newP:e.currentTarget.value})
    if(passwords.cNewP===e.currentTarget.value)
    setPassMatch(false);
  else
  setPassMatch(true);
  }
  const handleCPasswordChange=(e)=>{
    setPasswords({...passwords,cNewP:e.currentTarget.value})
    if(passwords.newP===e.currentTarget.value)
    setPassMatch(false);
  else
  setPassMatch(true);
  }
return(
    <div>
     {success&& <div style={{background: "var(--primary-color, #62C227)",padding:"10px",borderRadius:"20px",color:"white",display:"flex",justifyContent:"space-between",fontSize:"20px",fontWeight:"bold" }}><p>Password Updated Successfully</p>
     <p onClick={e=>setSuccess(false)} style={{textAlign:"end",cursor:"pointer",fontWeight:"bold",fontSize:"20px"}}>X</p></div>}
         <div style={{display:"flex",gap:"20px",textAlign:"start",marginTop:"20px"}}>
    
       {Object.keys(profile).length>0&&    <div style={{flex:24,}}>
        <h3 style={{fontSize:"35px",marginBottom:"20px"}}>Change Password</h3>
        <div style={{width:"55%",}}>
        <div style={{textAlign:'center'}}>
    
      <label htmlFor="email" style={{textAlign:"start",display:"block",marginBottom:"5px",fontSize:"20px",}}>Old Password</label>
        <input type="password"value={passwords.old} placeholder="Old Password"onChange={e=>setPasswords({...passwords,old:e.currentTarget.value})} style={{display:"block",backgroundColor:"white",paddingLeft:"10px",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>

        <label htmlFor="email" style={{textAlign:"start",display:"block",marginBottom:"5px",fontSize:"20px"}}>New Password</label>
        <input type="password"value={passwords.newP}onChange={handlePasswordChange} placeholder="New Password" style={{display:"block",backgroundColor:"white",paddingLeft:"10px",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>

        <label htmlFor="email" style={{textAlign:"start",display:"block",marginBottom:"5px",fontSize:"20px",}}>Confirm Password</label>
        <input type="password"value={passwords.cNewP}onChange={handleCPasswordChange} placeholder="Confirm New Password" style={{display:"block",backgroundColor:"white",paddingLeft:"10px",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
        {error&&<p style={{color:"red",textAlign:"start",margin:"0px",padding:"0px"}}>Old Password is not correct</p>}
        <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
            <div style={{flex:1}}></div>
            <div style={{flex:1,alignSelf:"flex-end",textAlign:"end",alignItems:"end"}}>
            {passMatch&& <button  style={{backgroundColor:"rgba(206, 206, 206, 1)",color:"white",padding:"15px 55px",marginTop:"30px",}}>Change Password</button>}
           {!passMatch&& <button onClick={submit} style={{backgroundColor:"#62C227",color:"white",padding:"15px 55px",marginTop:"30px",}}>Change Password</button>}
            </div>
        </div>
        </div>
        </div>
        </div>}
      
        </div>
    </div>
)
}

export default UpdateUserPassword;