import React from 'react';
import numberWithCommas from '../../../assets/js/formatNumber';
function ShowPlanDetails({selectedPlan,profile})
{

return(
    <div>
          <div style={{borderRadius: "20px",
border: "1px solid var(--grey, #777)",padding:"20px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"5px"}}>
    <p style={{fontSize:'16px',textAlign:"start"}}>{selectedPlan.title}</p>
    <p style={{fontSize:'16px'}}>IDR {numberWithCommas(selectedPlan.price*1000)}</p>
</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"5px"}}>
    <p style={{fontSize:'16px'}}>{profile.slots+profile.members.length}members</p>
    <p style={{fontSize:'16px'}}>x{profile.slots+profile.members.length}</p>
</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',marginBottom:"5px",}}>
    <p style={{fontSize:'16px'}}>Billing Interval</p>
    <p style={{fontSize:'16px'}}>Yearly</p>
</div>
<div style={{width:"100%",backgroundColor:"#011F1E",height:"1px"}}></div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:'center',}}>
    <p style={{fontSize:'16px'}}>Total</p>
    <p style={{fontSize:'16px'}}>{numberWithCommas((profile.slots+profile.members.length)*(parseFloat(selectedPlan.price)*1000))}</p>
</div>

</div>
    </div>
)
}

export default ShowPlanDetails;