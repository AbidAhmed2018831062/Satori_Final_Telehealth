import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../../../config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor:"white",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function InvoiceData({open,handleClose,handleOpen,data})
{
    const rows= [{value:"Admin Id",label:"adminId"},{value:"Invoice Id",label:"invoiceId"},{value:"Name",label:"name"},{value:"Hours Sponsored",label:"hours"},{value:"Total",label:"total",},{value:"Notes",label:"notes",},];
   const [status,setStatus]=React.useState(data.status);
   const [value,setValue]=React.useState(data.subscription);
   const submit=()=>{
    axios.put(`${baseURL}/superadmin/update`,{
        invoiceId:data.invoiceId,
        status
    }).then(res=>{
        console.log(res);
        location.reload();
    }).catch(err=>console.log(err))
   }
    return (
      <div>
      
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <div style={{marginTop:"10px"}}>
            <h3>View Invoice Details</h3>
     <form style={{margin:"0px auto"}}>
     {rows.map((row,index)=>{
     return(  <div key={row}>
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>{row.value}<span style={{color:"red"}}>*</span></label>
 <input type={(row.label==="hours"||row.label==="total")?"number":"text"}value={data[row.label]} placeholder={row.value} readOnly style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
 </div>)
      })}
    <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Status<span style={{color:"red"}}>*</span></label>
 <input type="text"value={status} placeholder="Enter Status" onChange={e=>setStatus(e.currentTarget.value)} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
     </form>
     <button style={{display: "block",
    width: "324px",
    height:"50px",
    backgroundColor:status===data.status?"rgba(206, 206, 206, 1)":"#62C227",
    margin:"0px auto",
    padding: "10px",
    justifyContent:" center",
    alignItems:" center",
    gap: "10px",
    marginTop:"100px"
  
    }}onClick={e=>status===data.status?"":submit()}>Confirm</button>
    </div>
          </Box>
        </Modal>
      </div>
    );
  }

export default InvoiceData;