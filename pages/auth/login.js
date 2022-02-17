import React, { useState } from 'react'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import styled from 'styled-components'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {theme} from '../../components/common/theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import Alert from '@mui/material/Alert'
const LoginGrid = styled(Grid)`
  background: #CCECCC;
  height: 100vh;
  padding-top: 40vh;
  @media screen and (max-width:767px) { 
    padding-top: 20vh;
  }
`
const LoginPaper = styled(Paper)`
  width: 50%;
  padding: 1rem;
  margin: 0 auto;
  text-align: center;
  position: relative;
  @media screen and (max-width:767px) { 
    width: 90%;
    height: 300px;
  }
`
const LoginPaperTypography = styled(Typography)`
  color: #2e7d32;
  font-size: 1.5rem;
  font-weight: bold;
`
const StyledTextField = styled(TextField)`
  width: 400px;
  margin-top: 2rem;
  @media screen and (max-width:767px) { 
    width: 100%;
  }
`
const StyledButton = styled(Button)`
  position: absolute;
  bottom: 25px;
  right: 25px;
`
const RegisterTypography = styled(Typography)`
  margin-top: 2rem;
  color: #333;
`
const StyledAlert = styled(Alert)`
  width: 50%;
  margin: 1rem auto;
`

const Login = () => {
  const { register, handleSubmit } = useForm()
  const [emailErrFlag, setEmailErrFlag] = useState(false)
  const [unauthorized, setUnauthorized] = useState(false)
  const [mistaken, setMistaken] = useState(false)
  const [successLogin, setSuccessLogin] = useState(false)
  const Axios = axios.create({
    xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true
  })
  // フォーム送信時の処理
  const onSubmit = (data) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(data.email)) {
      setEmailErrFlag(true)
      return
    } else {
      setEmailErrFlag(false)
    }
    let url = `${process.env.NEXT_PUBLIC_API}sanctum/csrf-cookie`
    let login = `${process.env.NEXT_PUBLIC_API}login`
    let email = data.email
    let password = data.password
    const loginParams = { email,password}
    axios.get(url, { withCredentials: true }).then(response => {
      // ログイン処理を実装する
      axios.post(login,loginParams,{ withCredentials: true }).then(response => {
        if(response.data.msg != 'OK') {
          setMistaken(true)
          setTimeout(() => {
            setMistaken(false)
          }, 3000)
        }
        setSuccessLogin(true)
        setTimeout(() => {
          setSuccessLogin(false)
        }, 3000)
      })
    })
  }
  const api = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API}api/user`, { withCredentials: true }).then((response) => {
    }).catch(error => {
      const {
        status,
        statusText
      } = error.response
      if(status == '401') {
        setUnauthorized(true)
        setTimeout(() => {
          setUnauthorized(false)
        }, 6000)
      }
      // console.log(`Error! HTTP Status: ${status} ${statusText}`)
    });
  }
  const logout = () => {
    axios.get(`${process.env.NEXT_PUBLIC_API}api/logout`, { withCredentials: true }).then((response) => {
    })
  }
  return (
    <LoginGrid>
      <ThemeProvider theme={theme}>
        {unauthorized && (
          <StyledAlert severity="error">ログインしてください。</StyledAlert>
        )}
        {mistaken && (
          <StyledAlert severity="error">メールアドレス又は、パスワードが間違っています。</StyledAlert>
        )}
        {successLogin && (
          <StyledAlert severity="success">ログインしました。</StyledAlert>
        )}
        <LoginPaper elevation={3}>
          <LoginPaperTypography>ログイン</LoginPaperTypography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StyledTextField id="outlined-basic" label="メールアドレス" variant="outlined" color={'primary'} {...register("email")} error={emailErrFlag} required />
            <StyledTextField id="outlined-password-input" label="パスワード" type="password" autoComplete="current-password" color={'primary'} {...register("password")} required />
            <StyledButton variant="contained" color={'primary'} startIcon={<LoginIcon />} type="submit">ログイン</StyledButton>
          </form>
          <StyledButton variant="contained" color={'primary'} startIcon={<LoginIcon />} onClick={api}>API</StyledButton>
          <Link href="/auth/register">
            <a><RegisterTypography>新規アカウント登録はこちら</RegisterTypography></a>
          </Link>
        </LoginPaper>
      </ThemeProvider>
      <StyledButton variant="contained" color={'primary'} startIcon={<LoginIcon />} onClick={logout}>ログアウト</StyledButton>
    </LoginGrid>
  )
} 
export default Login