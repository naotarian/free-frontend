import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from "react-redux"
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LoadingButton from '@mui/lab/LoadingButton'
const StyledConfirmTable = styled(TableContainer)`
  width: 600px;
  padding: 2rem;
  margin: 3rem auto;
`
const StyledTableHead = styled(TableHead)`
  background: #2e7d32;
`
const LoginPaperTypography = styled(Typography)`
  color: #2e7d32;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
`
const StyledButton = styled(LoadingButton)`
  @media screen and (min-width:1024px) { 
    float: right;
  }
  @media screen and (max-width:767px) { 
    margin-top: 2rem;
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`
const ConfirmTable = () => {
  const email = useSelector((state) => state.email)
  const user_name = useSelector((state) => state.user_name)
  const password = useSelector((state) => state.password)
  const accountType = useSelector((state) => state.accountType)
  const [loading, setLoading] = useState(false)
  const datas = {'user_name':user_name, 'email':email, 'password':password, 'accountType':accountType}
  const router = useRouter()
  const submit = () => {
    setLoading(true)
    let url = `${process.env.NEXT_PUBLIC_API}api/register_token`
    axios.post(url, datas).then(res => {
      setLoading(false)
      if(res.data.msg == 'OK') {
        //本登録メール送信しました画面に遷移
        router.push('/auth/temporary_done')
      }
    }).catch(error => {
      const {
        status,
        statusText
      } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    });
  }
  return (
    <StyledConfirmTable component={Paper}>
      <LoginPaperTypography>入力内容確認</LoginPaperTypography>
      <Table sx={{ width: 500 }} aria-label="simple table">
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
      <StyledButton variant="contained" loading={loading} color={'primary'} startIcon={<HowToRegIcon />} onClick={submit} type="submit">登録</StyledButton>
    </StyledConfirmTable>
  )
}
export default ConfirmTable