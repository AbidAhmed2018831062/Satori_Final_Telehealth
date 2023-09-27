import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../../Administrator/Dashboard.jsx/chooseimages.css";
import { baseURL } from '../../../config';
import Cookies from 'js-cookie';
import randomImage from  "../../assets/images/randomimage.png"
import Navbar from '../../Common/Navbar';
import Success from '../../Common/Success';
import { Navigate } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';
import { country_list } from '../../Administrator/Payment/countrynames';
import languages from '../../assets/js/languages';
import MultipleSelectChip from '../../CareProvider/Dashboard/MultipleSelect';
function CompleteandEditProfile({type,nav})
{
const allLanguage=languages();
    const [profile,setProfile]=useState({});
    useEffect(()=>{
       axios.get(`${baseURL}/members/profile?id=${Cookies.get("memberId")}`,).then(result=>{
           console.log(result.data);
           let makeProfile={};
           console.log(new Date(result.data.dob));
           if(result.data.dob)
           makeProfile={...result.data,language:result.data.languages[0],dobD:new Date(result.data.dob).getDate(),dobM:new Date(result.data.dob).getMonth()+1,dobY:new Date(result.data.dob).getFullYear()};
           else
            makeProfile={...result.data,dobD:1,dobM:0,dobY:"2000",country:"Indonesia",languages:["Indonesian"]}
           setProfile(makeProfile);
       }).catch(err=>console.log(err));
    },[])

    const [images,setImages]=useState("");
    const [success,setSuccess]=useState(false);
  const submit=(e)=>{
    e.preventDefault();
    let  dat=new FormData();
    console.log(dat);
    dat.append("dob",profile.dobM+" "+profile.dobD+" "+profile.dobY);
    dat.append("country",profile.country);
    dat.append("languages",profile.languages);
    dat.append("email",profile.email)

    console.log(images);
    dat.append('images', images);
    axios.put(`${baseURL}/members/updateprofile`,dat).then(res=>{
      console.log(res);
      setSuccess(true);
    },{headers: {
      Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
      }}).catch(err=>console.log(err))
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [file,setFile]=useState("");
  const handleImageChange=(event)=>{
    console.log(event.target.files[0])
    setImages(event.target.files[0]);
    setFile(URL.createObjectURL(event.target.files[0]));
  }
return(
    <div>
       {!nav&& <Navbar logout={true}/>}
 {success&&<div>
  <Navigate to="/member"></Navigate>
  <Success success={success}setSuccess={setSuccess} style1={{}}/>
  </div>
 }
    <h3 style={{fontSize:"35px",textAlign:'center'}}>{!nav?"Complete Your Profile":"Edit Profile"}</h3>
        <div style={{display:"flex",gap:"20px",textAlign:"start",marginTop:"20px"}}>
    
      {Object.keys(profile).length>0&&    <div style={{flex:24,}}>
   
       <div style={{width:"45%",margin:"20px auto"}}>
       <div style={{textAlign:'center'}}>
       {file===""&&  <img src={profile.images?`${baseURL}/images/${profile.images}`:randomImage} style={{width:"135px",height:"135px",borderRadius:"50%"}}/>}
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
      <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Date of Birth<span style={{color:"red"}}>*</span></label>

   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"10px"}}>
 <Select value={profile.dobD} placeholder={"DD"}onChange={e=>setProfile({...profile,dobD:e.target.value})}sx={{flex:1,display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px"}}>
  {new Array(31).fill(1).map((v, i) => <MenuItem key={i} value={i+1}>{i+1}</MenuItem>)}
    </Select>
    <Select value={profile.dobM} placeholder={"MM"}onChange={e=>setProfile({...profile,dobM:e.target.value})}sx={{flex:2,display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px"}}>
  {months.map((v, i) => <MenuItem key={v} value={i+1}>{v}</MenuItem>)}
    </Select>
    <Select value={profile.dobY} placeholder={"Full Year"}onChange={e=>setProfile({...profile,dobY:e.target.value})}sx={{flex:3/2,display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px"}}>
  {new Array(100) .fill(null) .map((v, i) => <MenuItem key={v} value={+new Date().getFullYear() - i}>{+new Date().getFullYear() - i}</MenuItem>)}
    </Select>
 </div>
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Country<span style={{color:"red"}}>*</span></label>

 <Select value={profile.country} placeholder={"Country"}onChange={e=>setProfile({...profile,country:e.target.value})}sx={{display:"block",textAlign:"start",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px"}}>
  {country_list.map((v, i) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
    </Select>
   <MultipleSelectChip profile={profile} setProfile={setProfile} type={"member"}/>
       <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
           <div style={{flex:1}}></div>
           <div style={{flex:1,alignSelf:"flex-end",textAlign:"end"}}>
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

export default CompleteandEditProfile;