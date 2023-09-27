import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function ShowInvoices({rows,head}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (ro) => {
    setRow(ro);
    setOpen(true)};
  const handleClose = () => setOpen(false);
  const [row,setRow]=React.useState({});
//   .MuiTableRow-root td:first-child {
//     border-top-left-radius: 10px;
//     border-bottom-left-radius: 10px;
//   }
  
//   .MuiTableRow-root td:last-child {
//     border-top-right-radius: 10px;
//     border-bottom-right-radius: 10px;
//   }
  return (
    <TableContainer >
      <Table
        sx={{ minWidth: 650, borderSpacing: '0 30px',borderRadius:"28px",
      }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow
            sx={{
          
           
              marginBottom: '100px',
              borderSpacing: '0 30px',
            }}
          >
            {head.map(e=>   <TableCell key={e} sx={{fontWeight:500,fontSize:"18px"}}>{e.value}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
           
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },  marginBottom:"30px"}}
            >
           {head.map(e=><TableCell sx={{fontWeight:500,fontSize:"18px",}} key={e}>{e.label==="created"?new Date(row[e.label]*1000).getDate()+"/"+(new Date(row[e.label]*1000).getMonth()+1)+"/"+new Date(row[e.label]*1000).getFullYear():e.label==="status"?<span style={{color:"rgba(98, 194, 39, 1)",fontWeight:"bold"}}>{row[e.label].toUpperCase()}</span>:e.label==="amount_paid"?"IDR "+row[e.label]:row[e.label]}</TableCell>)}
         
            </TableRow>
          ))}
        </TableBody>
      </Table>
 
    </TableContainer>
  );
}
