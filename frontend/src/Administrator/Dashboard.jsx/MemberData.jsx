import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import axios from 'axios';
import { baseURL } from '../../../config';
import Cookies from 'js-cookie';

export default function MemberData({rows,head,search,value}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick2 = (event,row) => {
      setAnchorEl(event.currentTarget);
      console.log(row);
    setRow(row)
    };
    const handleClose2 = () => {
      setAnchorEl(null);
    };
    console.log(rows.startDate);
  
  const [row,setRow]=React.useState({});
  const sendInvitationEmail=()=>{
    console.log(row);
     axios.post(`${baseURL}/admin/sendinvite`,{
       email:row.email,
       urL:`http://localhost:5173/member/register?email=${row.email}`,
       id:Cookies.get("id")
     }).then(res=>console.log(res)).catch(err=>console.log(err))
  }
  const removeuser=()=>{
    axios.put(`${baseURL}/admin/removeuser`,{
        email:row.email,
       id:Cookies.get("id")
      }).then(res=>{console.log(res)
    window.location.reload()}).catch(err=>console.log(err))
  }
  return (
    <TableContainer >
      <Table
        sx={{ minWidth: 650, borderSpacing: '0 30px' }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow
            sx={{
             
              marginBottom: '100px',
              borderSpacing: '0 30px',
            }}
          >
            {head.map(e=>   <TableCell key={e}>{e.value}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.filter((e,i)=>search?(e.email.includes(search)||e.startDate.includes(search))?e:"":e).map((row,i) => (
            <TableRow
           
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, marginBottom:"30px"}}
            >
           {head.map((e,index)=><TableCell key={e}>{e.label==="dueDate"?new Date(new Date(e.label).setMonth()+12).toLocaleDateString():e.label==="members"?row.members.length:e.label==="name"?"None":e.label==="no"?i+1:row[e.label]}</TableCell>)}
           <TableCell><MoreVertIcon  id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={e=>handleClick2(e,row,i)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose2}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={sendInvitationEmail}>Nudge</MenuItem>
        <MenuItem onClick={removeuser}>Remove</MenuItem>
       
      </Menu>
    </TableContainer>
  );
}
