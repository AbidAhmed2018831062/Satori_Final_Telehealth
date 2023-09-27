import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../../../config';
import Cookies from 'js-cookie';

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
function CreateInvoice({open,handleClose,handleOpen})
{
  const [allEmails,setAllEmails]=React.useState([]);
  React.useEffect(()=>{
   axios.get(`${baseURL}/superadmin/allemails`).then(result=>{
    console.log(result);
    setAllEmails(result.data)
   }).catch(err=>console.log(err))
  },[])
   const [data,setData]=React.useState({});
   const [selectedEmail,setSelectedEmail]=React.useState("");
  const rows= [{value:"Name",label:"name"},{value:"Hours Sponsored",label:"hours"},{value:"Total",label:"total",},{value:"Status",label:"status",},{value:"Notes",label:"notes",}];

  const createInvoice=()=>{
    axios.post(`${baseURL}/superadmin/createinvoice`,{...data,adminId:Cookies.get("adminId")}).then(res=>{
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
            <h3>Create a new Invoice</h3>
     <form style={{margin:"0px auto"}}>
      {rows.map((row,index)=>{
     return(  <div key={row}>
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>{row.value}<span style={{color:"red"}}>*</span></label>
 <input type={(row.label==="hours"||row.label==="total")?"number":"text"}value={data[row.label]} placeholder={row.value} onChange={e=>setData({...data,[row.label]:e.currentTarget.value})} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
 </div>)
      })}
       <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Choose Customer<span style={{color:"red"}}>*</span></label>
  {allEmails.length>0&&  <Select value={data.email} onChange={e=>setData({...data,email:e.target.value})} fullWidth placeholder='Choose Customer'>
      {allEmails.map(e=><MenuItem key={e} value={e}>{e}</MenuItem>)}
    </Select>}
     </form>
     <button style={{backgroundColor:"#1aae9f",padding:"10px 0px",color:"white",marginTop:"20px", borderRadius:"20px",textAlign:"center",display:"block",width:"100%"}}onClick={createInvoice}>Create Invoice</button>
    </div>
          </Box>
        </Modal>
      </div>
    );
  }

export default CreateInvoice;