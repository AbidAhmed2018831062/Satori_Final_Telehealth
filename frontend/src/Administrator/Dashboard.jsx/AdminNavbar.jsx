import React from 'react';
import logo from "../../assets/images/logo.png"
import { NavLink } from 'react-router-dom';

function AdminNavbar()
{

return(
    <div style={{width:"100%",boxShadow: "0px 4px 10px 0px #D9D9D9",textAlign:"start",display:"flex",justifyContent:"space-between",}}>
   <NavLink to="/admin"> <img src={logo} width="158"height="32px"style={{marginBottom:"20px",paddingTop:"15px",paddingLeft:"20px"}}/></NavLink>
   <p style={{fontSize:"20px",textDecoration:"underline",paddingRight:"20px"}}> <NavLink to="/admin" style={{color:"#111"}}>Cancel</NavLink></p>
   </div>
)
}

export default AdminNavbar;