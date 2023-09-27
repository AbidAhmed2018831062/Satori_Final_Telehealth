import { CheckBox } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"
import Navbar from "../Common/Navbar"
import { useState } from "react"
import q2nd from "../assets/images/q2nd.png";
import q1st from "../assets/images/q1st.png";

import { NavLink } from "react-router-dom";
export default function Questions(){
    const firstQuestions=[

        "Work",
        "Relationship",
        "Family",
        "Emotional",
        "Loneliness",
        "Anxiety",
        "Social"
    ]
    const secondQuestions=[
      "I’ve been feeling depressed.",
      "I feel anxious or overwhelmed.",
      "My mood is interfering with my job performance.",
      "I struggle with building/maintaining relationships.",
      "I am grieving.",
      "I have experienced trauma."
    ]
    const [page,setPage]=useState(1);
    return (
        <Box>
            <Navbar/>
            {page===1&&<Box sx={{width:"65%",margin:"20px auto"}}>
           <h3 style={{fontSize:"35px",fontWeight:"bold"}}>Let Us know your care provider preferences</h3>
           <Box>
           <img src={q1st} style={{width:"100%",marginBottom:"0px"}}/>

            <p style={{fontSize:"20px",textAlign:"start"}}>1. What problem(s) would you like to discuss?</p>
          {firstQuestions.map(e=>{
            return (<Stack key={e}direction={"row"} sx={{alignItems:'center',gap:"20px"}}>
              <input type="checkbox" style={{background:"white"}}/>
                <p style={{fontSize:"20px"}}>{e}</p>
            </Stack>)
          })}
          <Box sx={{textAlign:"end"}}>
          <button onClick={e=>setPage(2)} style={{borderRadius: "15px",
background: "var(--primary-color, #62C227)",color:"white",marginTop:"30px"}}>Confirm</button>
          </Box>
            </Box>
           </Box>}
           {page===2&&<Box sx={{width:"65%",margin:"20px auto"}}>
           <h3 style={{fontSize:"35px",fontWeight:"bold"}}>Let Us know your care provider preferences</h3>
           <Box>
            <img src={q2nd} style={{width:"100%",marginBottom:"0px"}}/>
                        <p style={{fontSize:"20px",textAlign:"start"}}>2. How can we help you?</p>

          {firstQuestions.map(e=>{
            return (<Stack key={e}direction={"row"} sx={{alignItems:'center',gap:"20px",marginTop:"0px"}}>
              <input type="checkbox" style={{background:"white"}}/>
                <p style={{fontSize:"20px"}}>{e}</p>
            </Stack>)
          })}
          <Box sx={{textAlign:"end"}}>
          <NavLink to="/member/showcareproviders"><button style={{backgroundColor:"white",color:"#62C227",padding:"15px 55px",marginTop:"30px",borderRadius:"20px",border:"1px solid #62C227"}}>Book a Session</button></NavLink>
          </Box>
            </Box>
           </Box>}
        </Box>
    )
}