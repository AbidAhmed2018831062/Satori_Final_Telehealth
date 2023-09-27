import { useState } from "react";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { baseURL } from "../../../config.js";

function Login()
{
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState(true);
const [dberror,setDbError]=useState(false);
function isValidEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailPattern.test(email);
  }
const handleEmailChange=(e)=>{
   if( isValidEmail(e.currentTarget.value)&&password.length>0)
   setError(false);
   else
   setError(true);
   setEmail(e.currentTarget.value);
}
const handlePasswordChange=(e)=>{
    console.log(isValidEmail(e.currentTarget.value)&&email.length>0);
    if( email.length>0)
    setError(false);
else
setError(true);
    setPassword(e.currentTarget.value);
 }
 const [navigate,setNavigate]=useState(false);
 const [plan,setNavigatePlan]=useState(false);

 const submit=(e)=>{
    e.preventDefault();
    axios.post(`${baseURL}/admin/login`,{
        email,password
    }).then(result=>{
        console.log(result);
        Cookies.set("id",result.data._id,{expires:365});
        Cookies.set("email",result.data.email,{expires:365})
        Cookies.set("companyName",result.data.companyName,{expires:365});
        Cookies.set("subscription",result.data.subscription,{expires:365});
        if(result.data.subscription===-1)
        setNavigatePlan(true);
    else
    setNavigate(true);
 
    }).catch(err=>setDbError(true))
 }
return(
    <div style={{width:"100%",paddingTop:"10rem"}}>
        {plan&&<Navigate to="/admin/onboarding/plan"></Navigate>}
        {navigate&&<Navigate to="/admin"></Navigate>}

     <img src={logo} width="228px"height="45px"style={{marginBottom:"20px"}}/>
     <p style={{fontWeight:"bold",marginBottom:"20px"}}>LogIn</p>
     <form style={{width:"25%",margin:"0px auto"}}>
        <label htmlFor="email" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Email Address</label>
        <input type="email"value={email}onChange={handleEmailChange} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        <label htmlFor="email" style={{textAlign:"start",display:"block",marginTop:"20px",marginBottom:"5px",}}>Password</label>
        <input type="password" value={password}onChange={handlePasswordChange} style={{display:"block",backgroundColor:"white",width:"100%",borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        {dberror&&<p style={{color:"red"}}>No such email and password combintation found</p>}
        <button onClick={error?"":submit} style={{backgroundColor:error?"#D9D9D9":"#62C227",color:"white",padding:"15px 55px",marginTop:"30px"}}>Submit</button>
     </form>
<a href="/" style={{color:"black",marginTop:"10px",textDecoration:"underline",fontWeight:"normal",marginBottom:"40px",display:"block"}}>Forget Password</a>
<p>Don't have an account? <a href="/register"style={{color:"black",textDecoration:"underline",}}>Create One</a></p>
<a href="/"style={{color:"black",marginTop:"30px",textDecoration:"underline",display:"block",fontWeight:700}}>Login as a Care Provider</a>
    </div>
)
}

export default Login;