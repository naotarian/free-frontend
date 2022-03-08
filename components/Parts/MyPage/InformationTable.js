import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

 const InformationTable = (props) =>  {
  const { userData } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                ユーザー名
              </TableCell>
              <TableCell component="th" scope="row">
                {userData.user_name}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                メールアドレス
              </TableCell>
              <TableCell component="th" scope="row">
                {userData.email}
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default InformationTable