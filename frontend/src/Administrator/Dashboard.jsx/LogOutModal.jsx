import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';

import axios from "axios";
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:200,md:400},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function LogOutModal({open,handleClose,handleOpen,type}) {
    const [navigate,setNavigate]=React.useState(false);
   const logOut=()=>{
    if(type==="cp")
    {
      Cookies.remove("careId");

    }
    else if(type==="member")
    Cookies.remove("memberId");
    Cookies.remove("id");
    Cookies.remove("subscription");
    Cookies.remove("email")
    Cookies.remove("companyName");
    setNavigate(true);
   }
  return (
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {navigate&&<Navigate to="/register"></Navigate>}
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:"center",marginBottom:"20px"}}>
           Are you sure you want to log out?
          </Typography>
       
          <Stack direction="row" sx={{justifyContent:"space-between",marginTop:"20px"}}>
            <Button variant="contained"sx={{backgroundColor:"#FF8F00",color:"white",padding:"10px 20px"}} onClick={logOut}>Yes</Button>
            <Button variant="text" onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
   
  );
}