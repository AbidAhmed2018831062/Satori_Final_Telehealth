import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import Navbar from "../../Common/Navbar";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../../../config";
import OTPInput from "../../Common/OTPPage";
function CareProviderRegister()
{
const [data,setData]=useState({email:"",first:"",last:"",password:"",cpass:""})
const [error,setError]=useState(true);
const [dberror,setDbError]=useState(false)
const rows= [{value:"First Name",label:"first"},{value:"Last Name",label:"last"},{value:"Email Address",label:"email"},{value:"Password",label:"password"},{value:"Confirm Password",label:"cpass"}];
function isValidEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailPattern.test(email);
}
const [navigate,setNavigate]=useState(false);
// const submit=(e)=>{
//     e.preventDefault();
//     setTimeout(() => {
//         setNavigate(true);
//     }, 2000);
// }
const [otp,setOtp]=useState();
useEffect(()=>{
   
        const digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        setOtp(OTP);
     
},[])

const handleCPassword=(e)=>{
    setData({...data,cpass:e.currentTarget.value});

  
    if( data.first.length>0&&data.email.length>0&&data.password===e.currentTarget.value&&data.last.length>0&&data.password.length>7&&isValidEmail(data.email))
       
    setError(false);
    
    else
    setError(true);
}
 const checkCorrectOrNot=(e,label)=>{
    setDbError(false);
    console.log(data);
    let pass=data.password;
  if(label==="password")
  pass=e.currentTarget.value
    if( data.first.length>0&&data.email.length>0&&pass===data.cpass&&data.last.length>0&&data.password.length>7&&isValidEmail(data.email))
    setError(false);
else
setError(true);
 }
 const submit=(e)=>{
    e.preventDefault();
     axios.post(`${baseURL}/careprovider/checkemail`,{
       otp,email:data.email
     }).then(res=>{
        console.log(res);
        setNavigate(true);
     }).catch(err=>{
        setDbError(true);
        console.log(err)
     })
 }
return(
    <div style={{width:"100%"}}>
       
        <Navbar/>
    {!navigate&&<div style={{marginTop:"5rem"}}>
     <h3 style={{fontWeight:"bold",marginBottom:"20px",fontSize:"35px"}}>Welcome to Satori</h3>
     <form style={{width:"25%",margin:"0px auto"}}>
      {rows.map((row,index)=>{
     return(  <div key={row}>
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>{row.value}<span style={{color:"red"}}>*</span></label>
 <input type={(row.label==="password"||row.label==="cpass")?"password":"text"}value={data[row.label]} placeholder={row.value} onChange={e=>{
    if(row.label==="cpass")
    handleCPassword(e);
    else{
    setData({...data,[row.label]:e.currentTarget.value})
checkCorrectOrNot(e,row.label);
    }
}} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
 </div>)
      })}
      {dberror&&<p style={{color:"red",marginTop:"20px"}}>Email Address already in use</p>}
     {error&&   <button  disabled style={{backgroundColor:"#D9D9D9",color:"white",padding:"15px 55px",marginTop:"30px"}}>Create Account</button>}
     {!error&& <button onClick={submit} style={{backgroundColor:"#62C227",color:"white",padding:"15px 55px",marginTop:"30px"}}>Create Account</button>}
     </form>

<p>Have an account? <a href="/cp/login"style={{color:"black",textDecoration:"underline",}}>Login</a></p>

<p>By signing up, I agree to SATORI’s Terms of Service and Privacy Policy. </p>
    </div>}
    {navigate&&<OTPInput data={data} otp1={otp} type={"care"}/>}
    </div>
)
}

export default CareProviderRegister;