import { Box, Stack } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import numberWithCommas from '../../../assets/js/formatNumber';
function UpgradePlan({selectedPlan,plans,profile,})
{

return(
    <div>
         <h5 style={{fontFamily:"Nunito",fontSize:"20px",fontWeight:"bold",marginTop:"30px",marginBottom:"10px"}}>Upgrade Your Plan</h5>
         {plans.slice(profile.subscription+1).map((plan,i)=>{
            return (<Box key={plan} sx={{borderRadius: "20px",padding:"10px",marginTop:"10px",
            border: "1px solid #000"}}>
                <Stack direction="row" sx={{justifyContent:'space-between',alignItems:'center',marginBottom:"0px"}}>
                    <h3 style={{fontSize:"35px",fontWeight:700,marginBottom:"0px"}}>{plan.title}</h3>
                    <div style={{textAlign:"end",marginBottom:"0px"}}>
                     <button style={{background: "var(--primary-color, #62C227)",color:"white",borderRadius:"15px"}}><NavLink to={`/admin/manage/upgrade/${plan.price}`}style={{color:'white'}}>Upgrade Plan</NavLink></button>
                 
                   
                    </div>
                </Stack>
                <p style={{fontSize:"35px",marginTop:"0px",marginBottom:"0px"}}>IDR {numberWithCommas(parseFloat(plan.price*1000))}/member/year</p>
                <p style={{marginLeft:"15px"}}>Benefits</p>
                <ul style={{marginLeft:"20px"}}>
                     {plan.desc.map(e=><li key={e}>{e}</li>)}
                     </ul>
            </Box>)
         })}
    </div>
)
}

export default UpgradePlan;