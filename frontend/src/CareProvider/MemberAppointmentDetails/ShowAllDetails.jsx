import { Box, Stack } from "@mui/material";
import carep from "../../assets/images/carep.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../config";

function age(birthdate) {
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() - 
               (today.getMonth() < birthdate.getMonth() || 
               (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    return age;
  }
export default function ShowAllDetails({event}){
    const [profile,setProfile]=useState({});
    const [careNotes,setcareNotes]=useState(event.careNotes);
  const submit=()=>{
    axios.put(`${baseURL}/careprovider/updatescarenotes`,{
        id:event._id,
        careNotes
      }).then(res=>{
        location.reload();
      }).catch(err=>console.log(err))
    }
    useEffect(()=>{
        axios.get(`${baseURL}/members/profile?id=${event.id}`,).then(result=>{
            console.log(result.data);
            setProfile(result.data);
     
        }).catch(err=>console.log(err));
    })
    return (<>
   {Object.keys(profile).length>0&& <Box>
    <Stack direction="row" sx={{gap:"20px"}}>
        <img src={!profile.images?carep:`${baseURL}/images/${profile.images}`} style={{width:"90px",height:"90px",borderRadius:"50%"}}/>
        <Box sx={{textAlign:"start"}}>
            <p style={{color:" ar(--primary-dark, #011F1E)",
            fontSize: "20px",fontWeight: 700,margin:"0px",padding:"0px"}}>{profile.firstName+" "+profile.lastName}</p>
<p style={{margin:"0px",padding:"0px"}}>{age(new Date(profile.dob))} years old</p>
        </Box>
       </Stack>
       <p style={{fontSize:"20px",fontWeight:"bold"}}>Patient Notes</p>
       <p>{event.notes}</p>
       <p style={{fontSize:"20px",fontWeight:"bold"}}>Care Provider Notes</p>
       <textarea rows={10} placeholder="Add Notes to myself" value={careNotes} onChange={e=>setcareNotes(e.currentTarget.value)} style={{width:"90%",backgroundColor:"white",padding:"10px",borderRadius:"20px"}}/>
       <Box sx={{textAlign:"end"}}>

     <button onClick={submit} style={{borderRadius: "15px",
background: "var(--primary-color, #62C227)",color:"white",marginTop:"30px"}} >Save Changes</button>
       </Box>
    </Box>}
    </>);
}