import React, { useState } from 'react'
import { useRouter } from 'next/router'
import store from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
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
import ConfirmTable from '../../components/Parts/ConfirmTable'
const StyledConfirmTable = styled(TableContainer)`
  width: 50%;
  margin: 0 auto;
`
const StyledTableHead = styled(TableHead)`
  background: #2e7d32;
`
const ConfirmGrid = styled(Grid)`
  background: #EDFFED;
  height: 100vh;
  padding-top: 5rem;
`
const RegisterConfirm = () => {
  const email = useSelector((state) => state.email)
  const user_name = useSelector((state) => state.user_name)
  const password = useSelector((state) => state.password)
  const datas = {'ユーザー名':user_name, 'メールアドレス':email, 'パスワード':password}
  const router = useRouter();
  return (
    <ConfirmGrid>
      <ConfirmTable />
    </ConfirmGrid>
  )
}

export default RegisterConfirm
