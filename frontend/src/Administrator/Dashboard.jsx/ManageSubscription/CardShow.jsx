import React from 'react';
import CardInput from '../../Payment/CardInput';
import { Box, Radio, TextField } from '@mui/material';

function CardShow({old,handleChange1,name,setName})
{

return(
    <div>
    <div style={{width:"50%"}}>
    <Box id="oldcard" sx={{borderRadius: "20px",paddingLeft:"20px",display:"flex",justifyContent:'space-between',
border: "1px solid #000",marginTop:"10px",textAlign:"start"}}><p style={{color:"var(--primary-dark, #011F1E)",alignItems:'center',
fontFamily: "Nunito",
fontSize: "20px",
fontStyle: "underline",
fontWeight: 600,
textAlign:"end",
cursor:"pointer",
lineHeight: "normal"}}>1234 1234 1234 1234</p>
<div >
<Radio
        checked={old === 'a'}
        onChange={ handleChange1 }
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
        sx={{marginTop:"10px"}}
      /></div></Box>
       <Box id="oldcard" sx={{borderRadius: "20px",paddingLeft:"20px",display:"flex",justifyContent:'space-between',
border: "1px solid #000",marginTop:"10px",textAlign:"start"}}><p style={{color:"var(--primary-dark, #011F1E)",alignItems:'center',
fontFamily: "Nunito",
fontSize: "20px",
fontStyle: "underline",
fontWeight: 600,
textAlign:"end",
cursor:"pointer",
lineHeight: "normal"}}><span style={{fontWeight:"bold",fontSize:"22px"}}>+</span>&nbsp; &nbsp;Add New Card</p> <Radio
checked={old === 'b'}
onChange={handleChange1}
value="b"
name="radio-buttons"
inputProps={{ 'aria-label': 'B' }}
/></Box>
  
   </div>
   {old==='b'&&<div style={{marginTop:"30px",marginRight:"40px"}}>
    <h3 style={{textAlign:"start"}}>Card Information</h3>
   <CardInput/>
   <p style={{fontSize:"16px",marginTop:"15px",textAlign:'start',fontWeight:600}}>Name on Card</p>
        <TextField
        
          id='outlined-email-input'
          sx={{borderRadius:"28px",marginTop:"0px","&:active":{
            borderRadius:"28px",
          }}}
          margin='normal'
        
          type='text'
          placeholder='Enter Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
   </div>}
   </div>
)
}

export default CardShow;