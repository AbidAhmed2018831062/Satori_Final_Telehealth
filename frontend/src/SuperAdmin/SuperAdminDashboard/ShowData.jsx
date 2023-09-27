import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material';

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
function ShowData({open,handleClose,handleOpen,data})
{
   
   const [value,setValue]=React.useState(data.subscription);
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
            <h3>Company Details</h3>
     <form style={{margin:"0px auto"}}>
     <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Company Id<span style={{color:"red"}}>*</span></label>
        <input type="text"value={data._id}readOnly placeholder="Company Id" style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
     <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Company Name<span style={{color:"red"}}>*</span></label>
        <input type="text"value={data.companyName}readOnly placeholder="Company Name" style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
        <label htmlFor="email" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>Company Email<span style={{color:"red"}}>*</span></label>
        <input type="email"value={data.email}placeholder="Company Email" readOnly  style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        <label htmlFor="phone" style={{textAlign:"start",display:"block",marginTop:"20px",marginBottom:"5px",}}>Phone</label>
        <input type="text" value={data.phone}readOnly placeholder="Company Phone" style={{display:"block",backgroundColor:"white",width:"100%",borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
        <label htmlFor="password" style={{textAlign:"start",display:"block",marginTop:"20px",marginBottom:"5px",}}>Password<span style={{color:"red"}}>*</span></label>
        <input type="password" value={data.password} readOnly placeholder="Password" style={{display:"block",backgroundColor:"white",width:"100%",borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input>
       
        {/* <label htmlFor="Subscription" style={{textAlign:"start",display:"block",marginTop:"20px",marginBottom:"5px",}}>Subscription<span style={{color:"red"}}>*</span></label>
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={value}
    sx={{padding:"0px 20px"}}
   
    onChange={e=>setValue(e.target.value)}
  >
 <MenuItem value={0}>0</MenuItem>
 <MenuItem value={1}>1</MenuItem>
 <MenuItem value={2}>2</MenuItem>

  </Select> */}
{data.paymentInfo[0]&& <div><label htmlFor="Payment Info" style={{textAlign:"start",display:"block",marginTop:"20px",marginBottom:"5px",}}>Payment Info<span style={{color:"red"}}>*</span></label>
        <input type="text" value={data.paymentInfo[0].customer} readOnly placeholder="Password" style={{display:"block",backgroundColor:"white",width:"100%",borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black"}}></input></div>}
     </form>
    </div>
          </Box>
        </Modal>
      </div>
    );
  }

export default ShowData;