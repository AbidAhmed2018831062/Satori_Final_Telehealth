import React from 'react';

function Success({success,setSuccess,style1})
{

return(
    <div style={style1}>
          {success&& <div style={{background: "var(--primary-color, #62C227)",padding:"10px",marginTop:"10px",borderRadius:"20px",color:"white",display:"flex",justifyContent:"space-between" }}><p style={{fontSize:"20px",fontWeight:"bold",color:"white"}}>Profile Updated Successfully</p>
    <p onClick={e=>setSuccess(false)} style={{textAlign:"end",cursor:"pointer",fontWeight:"bold",fontSize:"20px",marginRight:"20px",color:"white"}}>X</p></div>}
    </div>
)
}

export default Success;