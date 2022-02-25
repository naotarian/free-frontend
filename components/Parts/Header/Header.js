import React,{ useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { useCookies } from "react-cookie"
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
const HeaderGrid = styled(Grid)`
  width: 100%;
  height: 60px;
  background: #fff;
`
const Header = (props) => {
  const storeToken = useSelector((state) => state.csrf)
  const [cookies, setCookie, removeCookie] = useCookies()
  let url = `${process.env.NEXT_PUBLIC_API}api/me`
  let data = {'email': 'test@test.com', 'password': 'test' }
  let token_end_point = `${process.env.NEXT_PUBLIC_API}sanctum/csrf-cookie`
  const { token } = props;
  axios.post(`${process.env.NEXT_PUBLIC_API}api/me`,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((response) => {
    console.log(response)
  }).catch(error => {
    const {
      status,
      statusText
    } = error.response
  });
    // axios.post(url,data,{ withCredentials: true }).then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   const {
    //     status,
    //     statusText
    //   } = error.response
    //   console.log(`Error! HTTP Status: ${status} ${statusText}`)
    // })
  return (
    <HeaderGrid>
      <Typography>
        Header
      </Typography>
    </HeaderGrid>
  )
}
export default Header
