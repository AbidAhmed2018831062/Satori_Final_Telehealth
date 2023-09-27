import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../Administrator/Dashboard.jsx/chooseimages.css";
import { baseURL } from '../../config';
import Cookies from 'js-cookie';
import randomImage from  "../assets/images/randomimage.png"
import Navbar from './Navbar';
import Success from './Success';
import { Navigate } from 'react-router-dom';
import MultipleSelectCheckmarks from '../Members/Profile/ChooseMultiSelect';
import { MenuItem, Select } from '@mui/material';
import languages from '../assets/js/languages';
import MultipleSelectChip from '../CareProvider/Dashboard/MultipleSelect';
import { country_list } from '../Administrator/Payment/countrynames';
function CompleteProfile({type,nav})
{
  const [expError,setExpError]=useState(false);

  const [error,setError]=useState(true);
    const [profile,setProfile]=useState({});
    const rows= [{value:"Degree",label:"degree"},{value:"Years of Experience",label:"experience"},{value:"Practice License Number",label:"license"},{value:"Scheduling Link",label:"scheduleLink"},];
    useEffect(()=>{
       axios.get(`${baseURL}/careprovider/profile?id=${Cookies.get("careId")}`,).then(result=>{
           console.log(result.data);
           let make_profile=result.data;
           if(!result.data.country)
           {
            make_profile={...make_profile,country:"Indonesia"}
           }
           if(!result.data.languages[0])
           {
            make_profile={...make_profile,languages:["Indonesian"]}
           }
          

           setProfile(make_profile)
       }).catch(err=>console.log(err));
    },[])

    const [images,setImages]=useState("");
    const [success,setSuccess]=useState(false);
  const submit=(e)=>{
    setExpError(false);
    if(profile.experience<0){
      setExpError(true)

      return "";}
    e.preventDefault();
    
      setError(false)
      let  dat=new FormData();
    dat.append("degree",profile.degree);
    dat.append("experience",profile.experience);
    dat.append("license",profile.license);
    dat.append("specializations",profile.specializations);
    dat.append("email",profile.email);
    dat.append("country",profile.country);
    dat.append("expertise",profile.expertise);
    dat.append("scheduleLink",profile.scheduleLink);
    dat.append("languages",profile.languages);
    dat.append("bio",profile.bio);

    console.log(images);
    dat.append('images', images);
    axios.put(`${baseURL}/careprovider/editprofile`,dat).then(res=>{
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
       {!nav&& <Navbar logout={true}/>}
 {success&&<div>
  <Navigate to="/cp"></Navigate>
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
 
 {rows.map((row,index)=>{
     return(  <div key={row}>
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>{row.value}<span style={{color:"red"}}>*</span></label>
 <input type={(row.label==="experience")?"number":"text"}value={profile[row.label]} min={0} placeholder={row.value}onChange={e=>setProfile({...profile,[row.label]:e.currentTarget.value})}style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
 </div>)
      })}
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Country<span style={{color:"red"}}>*</span></label>

<Select value={profile.country} placeholder={"Country"}onChange={e=>setProfile({...profile,country:e.target.value})}sx={{display:"block",textAlign:"start",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px",border:"1px solid black"}}>
 {country_list.map((v, i) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
   </Select>
     <MultipleSelectChip profile={profile}setProfile={setProfile} type={"cp"}/>

     {/* <Select value={profile.language?profile.language:"Indonesian"} placeholder={"Language"}onChange={e=>setProfile({...profile,language:e.target.value})}sx={{display:"block",textAlign:"start",backgroundColor:"white",width:"100%", borderRadius:"10px", color:"black",marginBottom:"20px"}}>
  { Object.values(languages()).map((l) => <MenuItem key={l} value={l.name}>{l.nativeName}</MenuItem>)}
    </Select> */}
    <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Bio<span style={{color:"red"}}>*</span></label>

    <textarea value={profile.bio} onChange={e=>setProfile({...profile,bio:e.currentTarget.value})} rows={10} placeholder='Enter Your Bio' style={{padding:"20px",width:"95%",background:"#fff",borderRadius:"20px"}}/>
    {expError&&<p style={{color:"red"}}>Experience cannot be less than 0</p>}
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

export default CompleteProfile;