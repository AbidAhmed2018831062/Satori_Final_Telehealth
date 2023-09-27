import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ShowData from './ShowData';
import InvoiceData from './InvoiceData';
import ShowDataMember from './ReadOnlyData';



export default function BasicTable({rows,head,type}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (ro) => {
    setRow(ro);
    setOpen(true)};
  const handleClose = () => setOpen(false);
  const [row,setRow]=React.useState({});
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
            {head.map(e=>   <TableCell sx={{fontWeight:"bold",fontSize:"16px",textAlign:'center'}}key={e}>{e.value}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
         {type==="admin"&& rows.map((row) => (
            <TableRow
           
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'rgb(195, 207, 217)', marginBottom:"30px"}}
            >
           {head.map(e=><TableCell sx={{fontSize:"16px",textAlign:"center"}} key={e}>{e.label==="slots"?row.slots+row.members.length:e.label==="members"?row.members.length:row[e.label]}</TableCell>)}
           <TableCell sx={{cursor:"pointer"}}onClick={e=>handleOpen(row)}>
            {">>>"}
       

           </TableCell>
            </TableRow>
          ))}
            {type==="member"&& rows.map((row) => (
            <TableRow
           
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'rgb(195, 207, 217)', marginBottom:"30px"}}
            >
           {head.map(e=><TableCell sx={{fontSize:"16px",textAlign:"center"}} key={e}>{e.label==="name"?row.firstName+" "+row.lastName:row[e.label]}</TableCell>)}
           <TableCell sx={{cursor:"pointer"}}onClick={e=>handleOpen(row)}>
            {">>>"}
       

           </TableCell>
            </TableRow>
          ))}
          {type==="appointment"&& rows.map((row) => (
            <TableRow
           
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'rgb(195, 207, 217)', marginBottom:"30px"}}
            >
           {head.map(e=><TableCell sx={{fontSize:"16px",textAlign:"center"}} key={e}>{e.label==="start_time"?new Date(row[e.label]).toLocaleDateString():e.label==="created"?new Date().toLocaleDateString():row[e.label]}</TableCell>)}
           <TableCell sx={{cursor:"pointer"}}onClick={e=>handleOpen(row)}>
            {">>>"}
       

           </TableCell>
            </TableRow>
          ))}
          {type==="careprovider"&&rows.map((row) => (
            <TableRow
           
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'rgb(195, 207, 217)', marginBottom:"30px"}}
            >
           {head.map(e=><TableCell sx={{fontSize:"16px",textAlign:"center"}} key={e}>{e.label==="name"?row.firstName+" "+row.lastName:row[e.label]}</TableCell>)}
           <TableCell sx={{cursor:"pointer"}}onClick={e=>handleOpen(row)}>
            {">>>"}
       

           </TableCell>
            </TableRow>
          ))}
          {type==="invoice"&& rows.map((row) => (
            <TableRow
           
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'rgb(195, 207, 217)', marginBottom:"30px"}}
            >
           {head.map(e=><TableCell sx={{fontSize:"16px",textAlign:"center"}}key={e}>{e.label==="slots"?row.slots+row.members.length:e.label==="members"?row.members.length:row[e.label]}</TableCell>)}
           <TableCell sx={{cursor:"pointer"}}onClick={e=>handleOpen(row)}>
            {">>>"}
       

           </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open&&type==="admin"&&<ShowData open={open} handleClose={handleClose}handleOpen={handleOpen}data={row} />}
      {open&&type==="member"&&<ShowDataMember open={open} handleClose={handleClose}handleOpen={handleOpen}data={row} rows= {[{value:"Email",label:"email"},{value:"First Name",label:"firstName"},{value:"Last Name",label:"lastName"},{value:"Hours Sponsored",label:"hours"},{value:"Hours Used",label:"hours"},{value:"Onboarding Date",label:"onboardDate",},{value:"Country",label:"country"}]}/>}
      {open&&type==="careprovider"&&<ShowDataMember open={open} handleClose={handleClose}handleOpen={handleOpen}data={row} rows= {[{value:"Email",label:"email"},{value:"First Name",label:"firstName"},{value:"Last Name",label:"lastName"},{value:"Onboarding Date",label:"onboardDate",},{value:"Country",label:"country"}]}type={"careprovider"}/>}
      {open&&type==="invoice"&&<InvoiceData open={open} handleClose={handleClose}handleOpen={handleOpen}data={row} />}
    </TableContainer>
  );
}
