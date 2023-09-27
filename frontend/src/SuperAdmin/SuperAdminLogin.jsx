import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png"
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { baseURL } from "../../config.js";

function SuperAdminLogin()
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
// useEffect(()=>{
//  axios.post(`${baseURL}/superadmin/createsuperadmin`,{
//     email:"ahmedabid3409@gmail.com",
//     password:"satori123AbidAhmed"
//  }).then(res=>console.log(res)).catch(err=>console.log(err))
//eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTYyNzQ0LCJqdGkiOiJiNDAxYTQ5OS0xYjc3LTRmMDctYmUzNS1hYjZkOGFiYjY4YWIiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.rxp7KjpZUKJ_9AfxpHr5zV1UGCNwNfHa1PpZNqE4j92ZpG3OR8vrsS4eoKWOFCIoU_ljjKFoJIi2wXdjwwb-ig
// },[])
//http://localhost:5173/member
//clientid: aC4aXBtbmHGh23phMMnrttd6AX26XbTJv_k8Gdxbnzk
//client secret: wQm6Csmc6SrSsaFnj8MKn4JFfyE0XmnUS8VX2j07PIs
//webhookl: LnYrjHo__6O_dS7Oh48RchKcjAyc5wz5ssmLqyTecn4
//ZNYZPZAL7WFRITLJK6ZAKOOTAQQQDXIO
//cronfy
//lafaVuKILLB8blZwPbjfxGQ4I52X96jj
//CRN_7gV1lGvBL6mkBGUEMlnV8bKHAtHyYqJWRmRorl
//token=>eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTcyOTYxLCJqdGkiOiJjMDY4MjUzYy1jODZiLTQ2NjktOGFmZS04ODczMmQwZWJlNzUiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.tQ1yRLB7IeE9XGJjNZ7cHx18GdnvfNrY_ke8lZkiSK0uIiVL28RaxBVxiTjghgyh9E5Fnu-KeoKJvk1ZPqo4sw
//dildiyagallan=>eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjkzOTczMzMwLCJqdGkiOiI2YjY4NjkxMC01NTJlLTQ2YjItOWViMC00ZDQ1MThhMmRhNjEiLCJ1c2VyX3V1aWQiOiI2MmQ2YjEyOS1mNTNkLTQzNjctYjA3YS0wZDg4ZDA0ODI3NGQifQ.HmptWNKpuoh3Hp0cSCNr2RS-4UEFijrhw4Yy9BZU1d2YkM8b8P_CX8UgonklwT1q-d9RS0Aq-MP4FkKZfzRk_Q
//user=>    "uri": "https://api.calendly.com/users/62d6b129-f53d-4367-b07a-0d88d048274d"
//organizaTION=>    "current_organization": "https://api.calendly.com/organizations/94f0e49d-92ac-4f34-90a4-0ebb3cee18cd",

const token={
    "token_type": "Bearer",
    "expires_in": 7200,
    "created_at": 1548689183,
    "refresh_token": "b77a76ffce83d3bc20531ddfa76704e584f0ee963f6041b8bfc70c91373267d5",
    "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjMxNzI3Nzk5LCJqdGkiOiI5ZmViM2I0Zi04Njk1LTQzZjgtYWJhMS1kNDRiM2I5ZDdjYzEiLCJ1c2VyX3V1aWQiOiJCR0hIREdGREdIQURCSEoyIiwiYXBwX3VpZCI6IkppNzY5UjZ6eTZzSVN4X3I0OWRmZ0VsN0NPazVmeFVadVA0eHBadFlPbUkiLCJleHAiOjE2MzE3MzQ5OTl9.CrVBOFsqLjyfPK2E834E3sJv3fKU-PPlaNXQQB80Deo",
    "scope": "default",
    "owner": "https://api.calendly.com/users/EBHAAFHDCAEQTSEZ",
    "organization": "https://api.calendly.com/organizations/EBHAAFHDCAEQTSEZ"
  }
 const submit=(e)=>{
    e.preventDefault();
    axios.post(`${baseURL}/superadmin/login`,{
        email,password
    }).then(result=>{
        console.log(result);
        Cookies.set("adminId",result.data._id,{expires:365});
        Cookies.set("email",result.data.email,{expires:365})
     
        setNavigatePlan(true);

 
    }).catch(err=>setDbError(true))
 }
return(
    <div style={{width:"100%",paddingTop:"10rem"}}>
        {plan&&<Navigate to="/superadmin/"></Navigate>}
 

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

    </div>
)
}

export default SuperAdminLogin;