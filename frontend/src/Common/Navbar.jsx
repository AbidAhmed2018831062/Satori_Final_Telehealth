import logo from "../assets/images/logo.png"

function Navbar({logout})
{

return(
    <div style={{width:"100%",boxShadow: "0px 4px 10px 0px #D9D9D9",textAlign:"start",display:"flex",justifyContent:"space-between",alignItems:'center'}}>
     <img src={logo} width="158"height="32px"style={{marginBottom:"20px",paddingTop:"15px",paddingLeft:"20px",display:"block"}}/>
     {logout&&<p style={{textDecoration:"underline",alignSelf:"flex-end",marginRight:"20px"}}>Log Out</p>}
    </div>
)
}

export default Navbar;