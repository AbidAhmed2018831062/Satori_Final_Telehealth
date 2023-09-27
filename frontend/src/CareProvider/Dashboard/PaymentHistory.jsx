import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




export default function PaymentHistory({rows,head,type}) {
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
         
          {rows.map((row) => (
            <TableRow
           
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, marginBottom:"30px"}}
            >
           {head.map(e=><TableCell sx={{fontSize:"16px",textAlign:"center"}} key={e}>{e.label==="memberName"?"Session with "+row[e.label]:e.label==="start_time"?new Date(row[e.label]).toLocaleDateString():row[e.label]}</TableCell>)}
         
            </TableRow>
          ))}
       
        </TableBody>
      </Table>
      
    </TableContainer>
  );
}
