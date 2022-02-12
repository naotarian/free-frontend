import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import styled from 'styled-components'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
//components
import AccountTypeTab from '../../components/Parts/Auth/AccountTypeTab'
import {theme} from '../../components/common/theme/theme'
const LoginGrid = styled(Grid)`
  background: #CCECCC;
  height: 100vh;
  padding-top: 25vh;
  @media screen and (max-width:767px) { 
    padding-top: 10vh;
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
    height: auto;
  }
`
const RegisterPaperTypography = styled(Typography)`
  color: #2e7d32;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`
const StyledTextField = styled(TextField)`
  width: 400px;
  margin-top: 2rem;
  @media screen and (max-width:767px) { 
    width: 100%;
  }
`
const StyledButton = styled(Button)`
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
const RegisterTypography = styled(Typography)`
  margin-top: 2rem;
  color: #333;
`

const Login = () => {
  const { register, handleSubmit } = useForm()
  const [emailErrFlag, setEmailErrFlag] = useState(false);
  const [accountType, setAccountType] = useState('business')
  // フォーム送信時の処理
  const onSubmit = (data) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(data.email)) {
      setEmailErrFlag(true)
      return
    } else {
      setEmailErrFlag(false)
    }
  }
  const changeAccountType = (val) => {
    setAccountType(val)
  }
  return (
    <LoginGrid>
      <ThemeProvider theme={theme}>
        <LoginPaper elevation={3}>
          <AccountTypeTab accountType={accountType} changeAccountType={changeAccountType} />
          {accountType == 'business' ? (
            <>
              <RegisterPaperTypography>ビジネスアカウント登録</RegisterPaperTypography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <StyledTextField id="outlined-basic" label="ユーザー名" variant="outlined" color={'primary'} {...register("user_name")} required />
                <StyledTextField id="outlined-basic" label="メールアドレス" variant="outlined" color={'primary'} {...register("email")} error={emailErrFlag} required />
                <StyledTextField id="outlined-password-input" label="パスワード" type="password" autoComplete="current-password" color={'primary'} {...register("password")} required />
                <StyledTextField id="outlined-password-input" label="パスワード確認" type="password" autoComplete="current-password" color={'primary'} {...register("password_confirm")} required />
                <StyledButton variant="contained" color={'primary'} startIcon={<HowToRegIcon />} type="submit">登録</StyledButton>
              </form>
            </>
            ) : (
            <>
              <RegisterPaperTypography>一般アカウント登録</RegisterPaperTypography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <StyledTextField id="outlined-basic" label="ユーザー名" variant="outlined" color={'primary'} {...register("user_name")} required />
                <StyledTextField id="outlined-basic" label="メールアドレス" variant="outlined" color={'primary'} {...register("email")} error={emailErrFlag} required />
                <StyledTextField id="outlined-password-input" label="パスワード" type="password" autoComplete="current-password" color={'primary'} {...register("password")} required />
                <StyledTextField id="outlined-password-input" label="パスワード確認" type="password" autoComplete="current-password" color={'primary'} {...register("password_confirm")} required />
                <StyledButton variant="contained" color={'primary'} startIcon={<HowToRegIcon />} type="submit">登録</StyledButton>
              </form>
            </>
          )}           
          <Link href="/auth/login">
            <a><RegisterTypography>既存のアカウントにログイン</RegisterTypography></a>
          </Link>
        </LoginPaper>
      </ThemeProvider>
    </LoginGrid>
  )
} 
export default Login