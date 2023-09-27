import React, { useState } from 'react';
import numberWithCommas from '../../assets/js/formatNumber';
function Slots({page,plan,setPage,slots,handleSlots})
{
console.log(plan);
return(
    <div>
        <div style={{width:"75%",margin:"30px auto",display:"flex",justifyContent:"space-between",gap:"20px"}}>
            <div style={{flex:2}}>
            <h3 style={{fontSize:"35px",marginBottom:"0px",textAlign:"start"}}>Select Slots</h3>
            <p style={{fontSize:"20px",marginBottom:"20px",textAlign:"start"}}>How many members will be using this plan?</p>
            <input type="number"value={slots}onChange={handleSlots} placeholder="Enter Slots" style={{display:"block",backgroundColor:"white",width:"65%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
            </div>
            <div style={{flex:1}}>
            <h3 style={{fontSize:"35px",marginBottom:"10px",textAlign:"start"}}>Summary</h3>
            <div style={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",padding:"20px"}}>
<p style={{fontSize:"16px",textAlign:"start"}}>Plan </p>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"20px"}}>
    <p style={{fontSize:'16px',textAlign:"start"}}>{plan.title}</p>
    <p style={{fontSize:'16px'}}>IDR {numberWithCommas(plan.price*1000)}</p>
</div>
<p style={{fontSize:"16px",textAlign:"start"}}>Members </p>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"5px"}}>
    <p style={{fontSize:'16px'}}>{slots}</p>
    <p style={{fontSize:'16px'}}>x{slots}</p>
</div>
<div style={{width:"100%",backgroundColor:"#011F1E",height:"1px"}}></div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"10px",marginTop:"20px"}}>
    <p style={{fontSize:'16px'}}>Total</p>
    <p style={{fontSize:'16px'}}>{numberWithCommas(slots*(parseFloat(plan.price)*1000))}</p>
</div></div>
<div style={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",padding:"20px",marginBottom:"20px",marginTop:"20px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"20px"}}>
    <p style={{fontSize:'16px',textAlign:"start"}}>Total Payment</p>
    <p style={{fontSize:'16px'}}>{numberWithCommas(slots*(parseFloat(plan.price)*1000))}</p>
</div>
</div>
<button style={{display: "flex",
width: "100%",
height:" 50px",
backgroundColor:slots>0?"#62C227":"#CECECE",
margin:"20px auto",
padding: "10px",
justifyContent:" center",
alignItems:" center",
gap: "10px"
}}onClick={ef=>{
    localStorage.setItem("plan",plan.price===0?0:plan.price==="1499"?1:2)
    setPage(e=>e+1)}}>Confirm</button>
            </div>
           
        </div>
    </div>
)
}

export default Slots;