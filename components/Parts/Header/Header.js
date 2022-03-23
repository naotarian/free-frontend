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
  background: darkgreen;
`
const StyledLoginButton = styled(Button)`
  height: 100%;
  float: right;
  border-radius: 0;
`
const Header = (props) => {
  const storeToken = useSelector((state) => state.csrf)
  const [cookies, setCookie, removeCookie] = useCookies(['user_info'])
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()
  let url = `${process.env.NEXT_PUBLIC_API}api/me`
  let data = {}
  let token_end_point = `${process.env.NEXT_PUBLIC_API}sanctum/csrf-cookie`
  const { token, userInfo } = props;
  useEffect(() => {
    if(cookies.user_info && cookies.user_info != 'undefined') {
      //cookieにデータあり
      setAuthenticated(true)
    } else {
      //ログインチェック
      console.log(token)
      axios.post(`${process.env.NEXT_PUBLIC_API}api/me`,data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        if (!cookies.user_info || cookies.user_info == 'undefined') {
          setCookie("user_info", response.data)
          setAuthenticated(true)
        }
      }).catch(error => {
        const {
          status,
          statusText
        } = error.response
      })
    }
    userInfo(cookies.user_info)
  }, [])
  const login = () => {
    router.push('/auth/login')
  }
  const myPage = () => {
    router.push('/my_page')
  }
  return (
    <HeaderGrid>
        {!authenticated ? (
          <StyledLoginButton variant="contained" color={'primary'} startIcon={<LoginIcon />} onClick={login} type="submit">ログイン</StyledLoginButton>
        ) : (
          <StyledLoginButton variant="contained" color={'primary'} startIcon={<LoginIcon />} onClick={myPage} type="submit">マイページ</StyledLoginButton>
        )}
    </HeaderGrid>
  )
}
export default Header
