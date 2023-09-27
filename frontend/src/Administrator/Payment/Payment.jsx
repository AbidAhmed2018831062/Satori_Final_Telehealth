import React, { useEffect, useState } from 'react';
import payfirst from "../../assets/images/pagev21.png";
import paysecond from "../../assets/images/pagev22.png";
import paythird from "../../assets/images/pagev203.png";
import payfourth from "../../assets/images/payfourth.png";
import Navbar from '../../Common/Navbar';
import Slots from './Slots';
import CardPayment from './CardPayment';
import InviteMembers from './InviteMembers';
import logo from "../../assets/images/logo.png"
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../../config';
import StripePayment from './StripePayment';
import numberWithCommas from '../../assets/js/formatNumber';
function Payment()
{
    const [selectedPlan,setSelectedPlan]=useState()
    const [plan,setPlan]=useState(0);
    const [navigate,setNavigate]=useState("no");
    const [slots,setSlots]=useState(0);
const handleSlots=(e)=>{
    setSlots(e.currentTarget.value);
}
const handleSlots2=(e)=>{
    setSlots(e);
}
    const [plans,setPlans]=useState([]);
    useEffect(()=>{
        axios.get(`${baseURL}/payment/plans`).then(res=>{
            console.log(res.data);
            const plan=[
                {
                    id:"price_1NcAQPFWCeACHFzebFdC6pRJ",
                    title:res.data.data[2].name,
                    price:0,
                    duration:"/member/year",
                    desc:["5 sponsored hours per member","IDR 400K per appointment","Unlimited members"],
                    active:res.data.data[3].active,
                },
                {
                    id:"price_1NkxGcFWCeACHFze4bbUVBy5",
                    title:res.data.data[0].name,
                         price:0,
                         duration:"/member/year",
        desc:["10 sponsored hours per member","IDR 400K per appointment","Unlimited members"],
    
        active:res.data.data[1].active,
                },
               
            
  
            ];

            setPlans(plan);
            setSelectedPlan(plan[0])
        }).catch(err=>console.log(err));
    },[])
    const images=[payfirst,paysecond,paythird,payfourth];
    const [page,setPage]=useState(0);
  
  
return(
    <div>
         <div style={{width:"100%",boxShadow: "0px 4px 10px 0px #D9D9D9",textAlign:"start",display:"flex",justifyContent:"space-between",}}>
     <img src={logo} width="158"height="32px"style={{marginBottom:"20px",paddingTop:"15px",paddingLeft:"20px"}}/>
   {page>0&& <p style={{fontSize:"20px",textDecoration:"underline",paddingRight:"20px",cursor:"pointer"}}onClick={e=>page===2?setNavigate("dashboard"):setPage(e=>e-1)}>{page===2?"Skip":"Back"}</p>}
    </div>
    <img src={images[page]} style={{marginTop:"30px",width:"427px",height:"64px"}}/>
   {(navigate!=="no"&&navigate==="dashboard")&&<Navigate to="/admin"></Navigate>}
   

{page===0&&   <div style={{marginTop:"30px"}}>
        <h3 style={{fontSize:"30px"}}>Choose the right plan for your team</h3>
        <p style={{fontSize:"20px"}}>Every dollar invested in workplace mental health returns 4X in better health and<br></br> increased productivity.</p>
 {plans.length>0&&  <div style={{display:"flex",justifyContent:"center",gap:"30px",alignItems:'center',width:"65%",margin:"20px auto"}}>
        {plans.map((pla,index)=>{
            return (
                <div key={pla} onClick={e=>{setPlan(index)
                setSelectedPlan(plans[index])}}style={{padding:"20px 40px",textAlign:"center",border:"1px solid #62C227",borderWidth:index===plan?"3px":"1px",borderRadius:"10px"}}>
                   <h3 style={{fontSize:"37px",marginBottom:"7px"}}>{pla.title}</h3>
                   <p style={{marginBottom:"7px"}}>IDR</p>
                   <h3 style={{fontSize:"37px",marginBottom:"25px",marginTop:"5px"}}>{numberWithCommas(pla.price)}</h3>
                   {/* <p style={{marginBottom:"7px"}}>{pla.duration}</p> */}
                   {pla.desc.map(e=> <p key={e}>{e}</p>)}
                </div>
            )
        })}

    </div>}
  <button style={{display: "flex",
width: "324px",
height:" 70px",
backgroundColor:"#62C227",
margin:"20px auto",
padding: "10px",
justifyContent:" center",
alignItems:" center",
gap: "10px"
}}onClick={ef=>setPage(e=>e+1)}>Next</button>
    </div>}

    {page===1  && <div>
        <StripePayment page={page} plan={selectedPlan} setPage={setPage}  />
    </div>} 
    {page===2  && <div>
        <InviteMembers page={page} plan={selectedPlan} setPage={setPage}  emails1={[]}/>
    </div>} 
    </div>
)
}

export default Payment;