import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
//mui
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import HowToRegIcon from '@mui/icons-material/HowToReg'
const StyledButton = styled(LoadingButton)`
  @media screen and (min-width:1024px) { 
    position: absolute;
    bottom: 25px;
    right: 25px;
  }
  @media screen and (max-width:767px) { 
    margin-top: 2rem;
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`

 const InformationTable = (props) =>  {
  const { userData } = props
  const { register, handleSubmit } = useForm()
  const [emailErrFlag, setEmailErrFlag] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSubmit = (data) => {
    //ボタンloading
    setLoading(true)
    //メールアドレス正規表現チェック
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(data.email)) {
      setEmailErrFlag(true)
      setLoading(false)
      return
    } else {
      setEmailErrFlag(false)
      setLoading(false)
    }
  }
  return (
    <TableContainer component={Paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                ユーザー名
              </TableCell>
              <TableCell component="th" scope="row">
                <TextField
                  label='ユーザー名'
                  id="outlined-size-small"
                  defaultValue={userData.user_name}
                  size="small"
                  {...register('user_name')}
                />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                メールアドレス
              </TableCell>
              <TableCell component="th" scope="row">
              <TextField
                label='メールアドレス'
                id="outlined-size-small"
                defaultValue={userData.email}
                size="small"
                error={emailErrFlag}
                {...register('email')}
              />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <StyledButton variant="contained" color={'primary'} startIcon={<HowToRegIcon />} type="submit" loading={loading}>登録</StyledButton>
      </form>
    </TableContainer>
  );
}
export default InformationTable