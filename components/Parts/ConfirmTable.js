import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from "react-redux"
const StyledConfirmTable = styled(TableContainer)`
  width: 50%;
  margin: 3rem auto;
`
const StyledTableHead = styled(TableHead)`
  background: #2e7d32;
`
const ConfirmTable = () => {
  const email = useSelector((state) => state.email)
  const user_name = useSelector((state) => state.user_name)
  const password = useSelector((state) => state.password)
  const datas = {'ユーザー名':user_name, 'メールアドレス':email, 'パスワード':password}
  console.log(datas)
  return (
    <StyledConfirmTable component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <StyledTableHead>
          <TableRow>
            <TableCell>項目</TableCell>
            <TableCell align="right">入力内容</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
        {Object.entries(datas).map(([key, data]) => {
          return (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="right">{data}</TableCell>
            </TableRow>
          )
        })}
        </TableBody>
      </Table>
    </StyledConfirmTable>
  )
}
export default ConfirmTable