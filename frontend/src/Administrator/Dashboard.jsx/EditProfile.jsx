import { Avatar, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import admin from "../../assets/images/admin.png";
import { NavLink } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import dash from "../../assets/images/dash.png";
import email from "../../assets/images/email.png";
import dollar from "../../assets/images/dollar.png";
import "./chooseimages.css";
import { baseURL } from '../../../config';
function EditProfile()
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
       axios.get(`${baseURL}/admin/profile?id=${Cookies.get("id")}`,).then(result=>{
           console.log(result.data);
           setProfile(result.data);
       }).catch(err=>console.log(err));
    },[])
   
    const [images,setImages]=useState("");
    const [success,setSuccess]=useState(false);
  const submit=(e)=>{
    e.preventDefault();
    let  dat=new FormData();
    dat.append("email",profile.email);
    dat.append("companyName",profile.companyName);
    dat.append("phone",profile.phone);
    console.log(images);
    dat.append('images', images);
    axios.put(`${baseURL}/admin/editprofile`,dat).then(res=>{
      console.log(res);
      setSuccess(true);
    },{headers: {
      Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
      }}).catch(err=>console.log(err))
  }
  const [file,setFile]=useState("");
  const handleImageChange=(event)=>{
    console.log(event.target.files[0])
    setImages(event.target.files[0]);
    setFile(URL.createObjectURL(event.target.files[0]));
  }
return(
    <div>
     {success&& <div style={{background: "var(--primary-color, #62C227)",padding:"10px",marginTop:"10px",borderRadius:"20px",color:"white",display:"flex",justifyContent:"space-between" }}><p style={{fontSize:"20px",fontWeight:"bold"}}>Profile Updated Successfully</p>
     <p onClick={e=>setSuccess(false)} style={{textAlign:"end",cursor:"pointer",fontWeight:"bold",fontSize:"20px",marginRight:"20px"}}>X</p></div>}
         <div style={{display:"flex",gap:"20px",textAlign:"start",marginTop:"20px"}}>
    
       {Object.keys(profile).length>0&&    <div style={{flex:24,}}>
    
        <div style={{width:"45%",margin:"20px auto"}}>
        <div style={{textAlign:'center'}}>
        {file===""&& <Avatar
        sx={{ bgcolor: "#62C227",width:"100px", height:"100px",textAlign:"center",margin:"0px auto",marginTop:"20px" }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}

      >
{profile.companyName.substr(0,2)}
      </Avatar>}
      {file!==""&&  <div>
       
       <img src={file} style={{width:"100px",height:"100px",borderRadius:"50%"}}/>
     </div>}
      <input
       className="custom-file-input2"
        type="file"
        name="images"
        onChange={handleImageChange}
        style={{ display: "block", margin: "10px auto",width:"120px" }}
      />
  
    
      <label htmlFor="email" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Company Email</label>
        <input type="email"value={profile.email}readOnly placeholder="Company Name" style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
        <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Company Name</label>
        <input type="text"value={profile.companyName}onChange={e=>setProfile({...profile,companyName:e.currentTarget.value})} placeholder="Company Name" style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
        <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Phone Number</label>
        <input type="text"value={profile.phone}onChange={e=>setProfile({...profile,phone:e.currentTarget.value})} placeholder="Company Phone" style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
        <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
            <div style={{flex:1}}></div>
            <div style={{flex:1,alignSelf:"flex-end"}}>
            <button onClick={submit} style={{backgroundColor:"#62C227",color:"white",padding:"15px 55px",marginTop:"30px"}}>Save Changes</button>
            </div>
        </div>
        </div>
        </div>
        </div>}
      
        </div>
    </div>
)
}

export default EditProfile;