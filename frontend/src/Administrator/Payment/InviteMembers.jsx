import React, { useState } from 'react';
import Navbar from '../../Common/Navbar';
import laplac from "../../assets/images/laplac.png";
import Papa from "papaparse";
import ValidateEmail from '../../assets/js/ValidateEmail';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import "./customfile.css";
import { baseURL } from '../../../config';
import Cookies from 'js-cookie';
function InviteMembers({emails1})
{
  const [dupli,setDupli]=useState(false)
  const [navigate,setNavigate]=useState(false);
const [emails,setEmails]=useState([]);
const insertEmail=(e,index)=>{
   console.log(index);
   console.log(emails);
   const email=[...emails];
   
 
    // Start variable is used to set true
    // if a repeated duplicate value is
    // encontered in the output array.
    let outputArray=[];
    if(!ValidateEmail(e.currentTarget.value)){
      email[index].error=true;
        email[index].email=e.currentTarget.value;
        email[index].url=`http://staging.talkwithsatori.com/member/register?email=${e.currentTarget.value}&&companyId=${Cookies.get("id")}`
         setEmails(email);
         setDupli(true);
         return
    }
  
        for (let k = 0; k < email.length; k++) {
            if (e.currentTarget.value == email[k].email) {
              console.log("matched");
              email[index].error=true;
              email[index].email=e.currentTarget.value;
              email[index].url=`http://staging.talkwithsatori.com/member/register?email=${e.currentTarget.value}&&companyId=${Cookies.get("id")}`
               setEmails(email);
               setDupli(true);
               return;
            }
          }
        
    setDupli(false);
    email[index].email=e.currentTarget.value;
   email[index].error=false;
   email[index].url=`http://staging.talkwithsatori.com/member/register?email=${e.currentTarget.value}&&companyId=${Cookies.get("id")}`
   let count = 0;
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
     results.data.forEach(e=>{
     if( ValidateEmail(e.email)){
     console.log(e);
     addEmail.push({email:e.email,error:false,url:`http://staging.talkwithsatori.com/member/register?email=${e.email}&&companyId=${Cookies.get("id")}`});
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

  let count = 0;
 
// Start variable is used to set true
// if a repeated duplicate value is
// encontered in the output array.
let start = false;
// let outputArray=[];
 

let outputArray=[];

emails.forEach((ele)=>{
  if(!ele.error)
    outputArray.push(ele)
})

for (let j = 0; j < emails1.length; j++) {
    for (let k = 0; k < outputArray.length; k++) {
        if (emails1[j].email == outputArray[k].email) {
           outputArray.splice(k,1);
        }
    }
   
    
}
  axios.post(`${baseURL}/admin/sendinvitations`,{emails:outputArray,id:Cookies.get("id")}
  ).then(result=>{
    console.log(result);
    setNavigate(true);
    setSuccess(true);
    setEmails([]);
    setDupli(false);

  }).catch(err=>console.log(err))
// const upload=outputArray.map(element=>{
//   return   axios.post(`${baseURL}/admin/sendinvite`,{
//     email:element.email,
//     urL:`http://localhost:5173/member/register?email=${element.email}`
//   }).then(res=>console.log(res)).catch(err=>console.log(err))
// })
// axios.all(upload).then(res=>console.log(res)).catch(err=>console.log(err))

}
const removeEmail=(e,index)=>{
  const newEmails=[...emails];
  newEmails.splice(index,1);
  setDupli(false);
  setEmails(newEmails);
 }
const [success,setSuccess]=useState(false);
return(
    <div>
         {navigate&&<Navigate to="/admin"></Navigate>}
         {success&& <div style={{background: "var(--primary-color, #62C227)",padding:"10px",borderRadius:"20px",color:"white",display:"flex",justifyContent:"space-between",width:"65%",marginLeft:"30px",margin:"10px auto" }}><p style={{fontWeight:"bold",fontSize:"20px"}}>Members Invited Successfully</p>
     <p onClick={e=>setSuccess(false)} style={{textAlign:"end",cursor:"pointer",fontWeight:"bold",fontSize:"20px"}}>X</p></div>}

     <h3 style={{fontSize:"35px",marginBottom:"20px"}}>Invite Your members</h3>
     <div>
      {/* File Uploader */}
      <input
       className="custom-file-input"
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
    </div>
    <div style={{borderRadius: "20px",padding:"20px",width:"55%",margin:"10px auto",
border: "1px solid var(--primary-dark, #011F1E)"}}>
    <div style={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
        <p style={{fontSize:"18px",fontWeight:"normal",}}>Added Members: {emails.length}</p>
        <p style={{fontSize:"18px",fontWeight:"normal",textDecoration:"underline",color:"#62C227",cursor:"pointer"}} onClick={e=>setEmails(add=>[...add,{email:"",error:false,url:""}])}>+Add Members</p>
    </div>
    <div style={{margin:"20px auto"}}>
        {emails.map((add,index)=>{
            return (
              <div key={add}>
                <div  style={{border:add.error?"1px solid red":"none",paddingLeft:"10px",display:"flex",justifyContent:"space-between",alignItems:'center',backgroundColor:"#EBE5DE",paddingRight:"10px",borderRadius:"10px", width:"85%",margin:"10px auto",paddingTop:"10px",paddingBottom:"10px",borderColor:add.error?"red":"black"}}>
                <input type="email"value={add.email}onChange={e=>insertEmail(e,index)} placeholder="Email Address" style={{display:"block",flex:4,backgroundColor:"#EBE5DE", color:"black",border:"none",borderRadius:"10px",outline:"none","&:active":{border:"none"}}}></input>
               <img src={laplac} style={{marginBottom:"10px",}} onClick={e=>removeEmail(e,index)}/>
                </div>
              
                </div>)
                
        })}
          {dupli&&<p style={{color:"red",marginTop:"5px",marginBottom:"5px",textAlign:"start",paddingLeft:"50px",}}>There is a duplicate or incorrectly formatted email address.</p>}
    </div>
   
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
)
}

export default InviteMembers;