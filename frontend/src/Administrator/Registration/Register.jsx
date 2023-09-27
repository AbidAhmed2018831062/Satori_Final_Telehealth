import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import Navbar from "../../Common/Navbar";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../../../config";
import OTPInput from "../../Common/OTPPage";
function Register()
{
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [name,setName]=useState("");
const [phone,setPhone]=useState("");
const [error,setError]=useState(true);
const [dberror,setDbError]=useState(false);
const [cpassword,setCpassword]=useState("");
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
    setCpassword(e.currentTarget.value);

    console.log(password+" "+cpassword)
    if( password===e.currentTarget.value){
        console.log("Abid Ahmed")
    setError(false);
    }
    else
    setError(true);
}
const handleName=(e)=>{
    if( name.length>0&&password===cpassword&&email.length>0&&password.length>7)
    setError(false);
    else
    setError(true);
    setName(e.currentTarget.value);
}
const handlePhone=(e)=>{
    if( name.length>0&&password===cpassword&&email.length>0&&password.length>7)
    setError(false);
    else
    setError(true);
    setPhone(e.currentTarget.value);
}
const handleEmailChange=(e)=>{
   if( isValidEmail(e.currentTarget.value)&&password===cpassword&&name.length>0&&password.length>7)
   setError(false);
   else
   setError(true);
   setEmail(e.currentTarget.value);
}
const handlePasswordChange=(e)=>{
    if( name.length>0&&email.length>0&&e.currentTarget.value.length>7&&e.currentTarget.value===cpassword)
    setError(false);
else
setError(true);
    setPassword(e.currentTarget.value);
 }
 
 const submit=(e)=>{
    e.preventDefault();
     axios.post(`${baseURL}/admin/checkemail`,{
       otp,email
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
     <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Company Name<span style={{color:"red"}}>*</span></label>
        <input type="text"value={name}onChange={handleName} placeholder="Company Name" style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
        <label htmlFor="email" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Company Email<span style={{color:"red"}}>*</span></label>
        <input type="email"value={email}placeholder="Company Email" onChange={handleEmailChange}  style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        <label htmlFor="phone" style={{textAlign:"start",display:"block",marginTop:"20px",marginBottom:"5px",}}>Phone</label>
        <input type="text" value={phone}onChange={handlePhone}placeholder="Company Phone" style={{display:"block",backgroundColor:"white",width:"100%",borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        <label htmlFor="password" style={{textAlign:"start",display:"block",marginTop:"20px",marginBottom:"5px",}}>Password<span style={{color:"red"}}>*</span></label>
        <input type="password" value={password}onChange={handlePasswordChange} placeholder="Password" style={{display:"block",backgroundColor:"white",width:"100%",borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        <label htmlFor="cpassword" style={{textAlign:"start",display:"block",marginTop:"20px",marginBottom:"5px",}}>Confirm Password<span style={{color:"red"}}>*</span></label>
        <input type="password" value={cpassword}onChange={handleCPassword} placeholder="Confirm Password" style={{display:"block",backgroundColor:"white",width:"100%",borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        {dberror&&<p style={{color:"red",margin:"0px"}}>Email address already in use</p>}
     {error&&   <button  disabled style={{backgroundColor:"#D9D9D9",color:"white",padding:"15px 55px",marginTop:"30px"}}>Create Account</button>}
     {!error&& <button onClick={submit} style={{backgroundColor:"#62C227",color:"white",padding:"15px 55px",marginTop:"30px"}}>Create Account</button>}
     </form>

<p>Have an account? <a href="/login"style={{color:"black",textDecoration:"underline",}}>Login</a></p>
<a href="/"style={{color:"black",marginTop:"30px",textDecoration:"underline",display:"block",fontWeight:700}}>Login as a Care Provider</a>
<p>By signing up, I agree to SATORI’s Terms of Service and Privacy Policy. </p>
    </div>}
    {navigate&&<OTPInput data={{name,email,phone,password}} otp1={otp}/>}
    </div>
)
}

export default Register;