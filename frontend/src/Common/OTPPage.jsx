import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import AdminNavbar from '../Administrator/Dashboard.jsx/AdminNavbar';
import axios from 'axios';
import { baseURL } from '../../config';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export default function OTPInput({data,otp1,type,}) {
    const [navigate,setNavigate]=useState(false);
    const [dberror,setDbError]=useState(false);
    const [navText,setNavText]=useState("");
  const [otp, setOtp] = useState('');
  const handleChange=(e=>{
    setOtp(e);
  })
  const submit=()=>{
      if(otp!==otp1){
    setDbError(true)
    return;    
}
if(type==="care")
{
 axios.post(`${baseURL}/careprovider/createcareprovider`,data, {
       headers: {
           'Content-Type': 'application/json'
       }}).then(result=>{
       console.log(result);
       Cookies.set("careId",result.data._id,{expires:365});
       Cookies.set("email",result.data.email,{expires:365})
       setNavigate(true);
       setNavText("/cp/onboarding");

   }).catch(err=>{
       setDbError(true);
       console.log(err)})
}
else if(type==="member")
{
  console.log(data);
  axios.post(`${baseURL}/members/createmember`,data, {
    headers: {
        'Content-Type': 'application/json'
    }}).then(result=>{
    console.log(result);
    Cookies.set("memberId",result.data._id,{expires:365});
    Cookies.set("email",result.data.email,{expires:365})
    setNavigate(true);
    setNavText("/member/onboarding");

}).catch(err=>{
    setDbError(true);
    console.log(err)})
}
   else{ 
  
    const data1=new FormData();
    data1.append("companyName",data.name);
    data1.append("email",data.email);
    data1.append("phone",data.phone);
    data1.append("password",data.password);
   axios.post(`${baseURL}/admin/createadminsitrator`,data1, {
       headers: {
           'Content-Type': 'application/json'
       }}).then(result=>{
       console.log(result);
       Cookies.set("id",result.data._id,{expires:365});
       Cookies.set("email",result.data.email,{expires:365})
       Cookies.set("companyName",result.data.companyName,{expires:365});
       Cookies.set("subscription",-1,{expires:365});
       setNavigate(true);
       setNavText("/admin/onboarding/plan");


   }).catch(err=>{
       setDbError(true);
       console.log(err)})
    }
  }
  const resend=()=>{
   
    axios.post(`${baseURL}/admin/checkemail`,{
      otp:otp1,email:data.email
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
       setDbError(true);
       console.log(err)
    })
  }
  return (
    <div >
      <div style={{width:"65%",margin:"20px auto"}}>
         {navigate&&<Navigate to={navText}></Navigate>}
    
        <h4 style={{fontSize:"35px",fontWeight:"bold",marginBottom:"0px",marginTop:"20px"}}>Confirm your email address</h4>
        <p style={{fontSize:"20px",fontWeight:500,marginBottom:"20px",marginTop:"0px"}}>Enter the OTP sent to {data.email}</p>
        <div style={{margin:"70px auto"}}>
    <OtpInput
      value={otp}
      containerStyle={{textAlign:'center',justifyContent:"center"}}
      inputStyle={{border:"1px solid rgba(98, 194, 39, 1)",padding:"20px 20px",width:"40px",height:"40px",borderRadius:"20px",fontSize:'20px',fontWeight:"bold",backgroundColor:"white"}}
      placeholder='XXXXXX'
      onChange={handleChange}
      numInputs={6}
      renderSeparator={<span style={{marginRight:"40px"}}> </span>}
      renderInput={(props) => <input {...props} />}
    />
   {dberror&& <p style={{color:"red",marginTop:'20px',}}>OTP does not match</p>}
    </div>
    
    <button style={{display: "flex",
width: "324px",
height:"70px",
backgroundColor:otp.length>0?"#62C227":"#CECECE",
margin:"20px auto",
padding: "10px",
justifyContent:" center",
alignItems:" center",
gap: "10px",
color:"white",
fontWeight:"bold"
}}onClick={e=>otp.length>0?submit():""}>Confirm</button>
    </div>
 <span onClick={resend} style={{display:"block",color:"blue",cursor:"pointer",textDecoration:"underline"}}>Resend OTP</span>
    </div>
  );
}