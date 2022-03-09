import React, { useState } from 'react'
import axios from 'axios'
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
import Alert from '@mui/material/Alert'
//icons
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
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
const EditAlert = styled(Alert)`
  margin-bottom: 2rem;
`
const InformationTable = (props) =>  {
  const { userData } = props
  const { register, handleSubmit } = useForm()
  const [emailErrFlag, setEmailErrFlag] = useState(false)
  const [userNameErrFlag, setUserNameErrFlag] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editMessageSuccess, setEditMessageSuccess] = useState(null)
  const [editMessageNotChange, setEditMessageNotChange] = useState(null)
  const onSubmit = (data) => {
    //ボタンloading
    setLoading(true)
    //メールアドレス正規表現チェック
    let errFlag = false
    if(!data.user_name) {
      setLoading(false)
      setUserNameErrFlag(true)
      errFlag = true
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(data.email)) {
      setEmailErrFlag(true)
      setLoading(false)
      errFlag = true
    } else {
      setEmailErrFlag(false)
      setLoading(false)
    }
    //何かしらバリデーションで落ちたらpostしない
    if(errFlag) {
      return
    }
    data.id = userData.id
    let url = `${process.env.NEXT_PUBLIC_API}api/edit_user_information`
    //ユーザー情報更新post
    axios.post(url, data).then(res => {
      if(res.status == '200') {
        if(res.data.data.status) {
          setEditMessageSuccess(res.data.data.msg)
          setTimeout(() => {
            setEditMessageSuccess(null)
          }, 3000)
        } else {
          setEditMessageNotChange(res.data.data.msg)
          setTimeout(() => {
            setEditMessageNotChange(null)
          }, 3000)
        }
        setLoading(false)
      } else {
        setLoading(false)
      }
    }).catch(error => {
      setLoading(false)
      const {
        status,
        statusText
      } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    });
  }
  return (
    <React.Fragment>
      {editMessageSuccess && 
        <EditAlert severity="success">{editMessageSuccess}</EditAlert>
      }
      {editMessageNotChange && 
        <EditAlert severity="info">{editMessageNotChange}</EditAlert>
      }
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
                    error={userNameErrFlag}
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
          <StyledButton variant="contained" color={'primary'} startIcon={<ChangeCircleIcon />} type="submit" loading={loading}>更新</StyledButton>
        </form>
      </TableContainer>
    </React.Fragment>
  );
}
export default InformationTable