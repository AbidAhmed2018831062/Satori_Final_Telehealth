import React, { useState } from 'react';
import Navbar from '../../Common/Navbar';
import laplac from "../../assets/images/laplac.png";
import Papa from "papaparse";
import ValidateEmail from '../../assets/js/ValidateEmail';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import "../Payment/customfile.css";
import Cookies from 'js-cookie';
import { Avatar } from '@mui/material';
import { baseURL } from '../../../config';
function SendInvitation({slots,handleSlots})
{
  const [navigate,setNavigate]=useState(false);
  const [emails,setEmails]=useState([]);
  const insertEmail=(e,index)=>{
     console.log(index);
     console.log(emails);
      const email=[...emails];
      email[index].email=e.currentTarget.value;
      email[index].error=false;
      email[index].url=`http://localhost:5173/member/register?email=${e.currentTarget.value}`
      setEmails(email);
   
  }
  // const [emailsFromCSV,setEmailsFromCSV]=useState([]);
  const changeHandler = (event) => {
    setEmails([]);
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    const addEmail=[];
  
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
       results.data.splice(0,slots).forEach(e=>{
       if( ValidateEmail(e.email)){
       console.log(e);
       addEmail.push({email:e.email,error:false,url:`http://localhost:5173/member/register?email=${e.email}`});
       }
  
       });
       setEmails(addEmail);
       console.log(addEmail)
      },
    });
  };
  const sendInvitations=()=>{
  console.log("I am Abid");
  let errors=false;
  emails.forEach((e,i)=>{
    if(!ValidateEmail(e.email))
    {
      const email=[...emails];
      email[i].error=true;
      setEmails(email);
      errors=true;
    }
  });
  if(!errors)
  {
    axios.post(`${baseURL}/admin/sendinvitations`,{emails,slots:slots-emails.length,id:Cookies.get("id")}
    ).then(result=>{
      console.log(result);
      setNavigate(true);
      handleSlots(slots-emails.length);
    }).catch(err=>console.log(err))
  }
  }
return(
    <div >
         <div style={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
            <p style={{fontWeight:600,fontSize:"20px"}}>Invite Members</p>
            <Avatar
        sx={{ bgcolor: "#62C227" }}
       
      >
        AA
      </Avatar>
        </div>
     <h3 style={{fontSize:"35px",marginBottom:"20px"}}>Send Invitations</h3>
     {/* <a href="/" style={{textDecoration:"underline",display:"block",marginBottom:"20px"}}>Upload CSV</a> */}
    <div style={{borderRadius: "20px",padding:"20px",width:"75%",
border: "1px solid var(--primary-dark, #011F1E)"}}>
    <div style={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
        <p style={{fontSize:"18px",fontWeight:"normal"}}>Added Members: {emails.length}/{slots}</p>
        <p style={{fontSize:"18px",textDecoration:"underline",fontStyle:"bold",fontWeight:"bold",color:"#62C227" }} onClick={e=>setAdded(add=>[...add,1])}>+Add Membebrs</p>
    </div>
    <div style={{margin:"20px auto"}}>
        {emails.map((add,index)=>{
            return (
              <div key={add}>
                <div  style={{border:"2px",paddingLeft:"10px",display:"flex",justifyContent:"space-between",alignItems:'center',backgroundColor:"#EBE5DE",paddingRight:"10px",borderRadius:"10px", width:"85%",margin:"10px auto",paddingTop:"10px",paddingBottom:"10px",}}>
                <input type="email"value={add.email}onChange={e=>insertEmail(e,index)} placeholder="Company Name" style={{display:"block",flex:4,backgroundColor:"#EBE5DE", color:"black",border:"none",outline:"none","&:active":{border:"none"}}}></input>
               <img src={laplac} style={{marginBottom:"10px",}} onClick={e=>{
                const newEmails=[...emails];
                newEmails.splice(index,1);
                setEmails(newEmails);
               }}/>
                </div>
                {add.error&&<p style={{color:"red",marginTop:"5px",marginBottom:"5px",textAlign:"start",paddingLeft:"50px",}}>Wrong email. Enter a correct one</p>}
                </div>)
        })}
    </div>
    <button style={{display: "flex",
width: "300px",
height:"70px",
color:"white",
backgroundColor:"#62C227",
margin:"20px auto",
padding: "10px",
justifyContent:" center",
alignItems:" center",
gap: "10px"
}}onClick={sendInvitations} disabled={emails.length>0?false:true}>Send Invitations</button>
</div>
    </div>
)
}

export default SendInvitation;