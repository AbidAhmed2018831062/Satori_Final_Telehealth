import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseURL } from '../../../config';
import Cookies from 'js-cookie';
import ShowInvoices from '../Payment/ShowInvoices';

function Invoices()
{
const [toDo,setToDo]=React.useState('');
const [warning,setWarning]=React.useState(null);
const [invoices,setInvoices]=useState([]);
useEffect(()=>{
axios.get(`${baseURL}/payment/invoices?id=${Cookies.get("id")}`).then(res=>setInvoices(res.data)).catch(err=>console.log(err));
},[])
return(
    <div style={{marginTop:"20px"}}>
        <h3 style={{fontSize:"35px",fontFamily:"Nunito",marginBottom:'20px'}}>Payment History</h3>
        <div style={{borderRadius:"28px",border:"1px solid black"}}>
         {invoices.length>0&&  <ShowInvoices head={[{value:"Payment Date",label:"created"},{value:"Description",label:"description"},{value:"Sponsored Hours",label:"hours"},{value:"Amount",label:"amount_paid"},{value:"Status",label:"status"}]} rows={invoices}/>}
         </div>
    </div>
)
}

export default Invoices;