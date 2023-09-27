import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {  InputAdornment, MenuItem, Select, Stack, TextField } from '@mui/material';
import MultipleSelectChip from '../../CareProvider/Dashboard/MultipleSelect';

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
function ShowDataMember({open,handleClose,handleOpen,data,rows,type})
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
            <h3>{type==="careprovider"?"Care Provider":"Member"} Details</h3>
     <form style={{margin:"0px auto"}}>
     {rows.map((row,index)=>{
     return(  <div key={row}>
 <label htmlFor="name" style={{textAlign:"start",display:"block",marginBottom:"5px",}}>{row.value}<span style={{color:"red"}}>*</span></label>
 <input type={(row.label==="password"||row.label==="cpass")?"password":"text"} readOnly={row.label==="email"?true:false}value={data[row.label]} placeholder={row.value} style={{display:"block",backgroundColor:"white",width:"100%", borderRadius:"10px", paddingTop:"10px",paddingBottom:"10px",color:"black",marginBottom:"20px"}}></input>
 </div>)
      })}
   {type==="careprovider"&&<MultipleSelectChip profile={data}/>}
     </form>
    </div>
          </Box>
        </Modal>
      </div>
    );
  }

export default ShowDataMember;