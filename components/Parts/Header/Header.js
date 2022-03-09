import React,{ useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { useCookies } from "react-cookie"
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import { useRouter } from 'next/router'
const HeaderGrid = styled(Grid)`
  width: 100%;
  height: 60px;
  background: #fff;
`
const StyledLoginButton = styled(Button)`
  height: 100%;
  float: right;
  border-radius: 0;
`
const Header = (props) => {
  const storeToken = useSelector((state) => state.csrf)
  const [cookies, setCookie, removeCookie] = useCookies()
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()
  let url = `${process.env.NEXT_PUBLIC_API}api/me`
  let data = {}
  let token_end_point = `${process.env.NEXT_PUBLIC_API}sanctum/csrf-cookie`
  const { token } = props;
  //ログインチェック
  axios.post(`${process.env.NEXT_PUBLIC_API}api/me`,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((response) => {
    if(response.data.data) {
      setAuthenticated(true)
    }
    console.log(response)
  }).catch(error => {
    const {
      status,
      statusText
    } = error.response
  })
  const login = () => {
    router.push('/auth/login')
  }
  const myPage = () => {
    router.push('/my_page')
  }
  return (
    <HeaderGrid>
        {authenticated ? (
          <StyledLoginButton variant="contained" color={'primary'} startIcon={<LoginIcon />} onClick={login} type="submit">ログイン</StyledLoginButton>
        ) : (
          <StyledLoginButton variant="contained" color={'primary'} startIcon={<LoginIcon />} onClick={myPage} type="submit">マイページ</StyledLoginButton>
        )}
    </HeaderGrid>
  )
}
export default Header
