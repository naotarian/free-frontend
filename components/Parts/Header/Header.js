import React,{ useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { nextCsrf } from "next-csrf"
const HeaderGrid = styled(Grid)`
  width: 100%;
  height: 60px;
  background: #fff;
`
const Header = () => {
  const getCookie = () => {
    var arr = new Array();
    if(document.cookie != ''){
      var tmp = document.cookie.split('; ');
      for(var i=0;i<tmp.length;i++){
        var data = tmp[i].split('=');
        arr[data[0]] = decodeURIComponent(data[1]);
      }
    }
    return arr;
  }
  const csrf = 'eyJpdiI6IlhDU1k5SkwzVWhuZUJDS3RDdTBnSkE9PSIsInZhbHVlIjoieHhTMzJVMk0zdXVxcW42WXI5OGErRkNzTERhZXhUZlJPTjFpbERNSTVpNG9kNm5wZ0I2RnA0Q2Mvay9wSUJqeEI5UFhRLzY1WjV3eStJY0ZaTGdFU0J6ZEFmS0ozZS80akY5MGZ0WE5GZE9teWI4Q2hTbzREYUNVcngyYWFuQlgiLCJtYWMiOiJkMWMwZTcxYjUzNmIyZmFjNzc2NjQzNDJkZTFlNDg1NzU0MTYzYTI3MDU5Yjg2NGE0NWIyOTZhOWI0ZmRlNWU5IiwidGFnIjoiIn0='
  let url = `${process.env.NEXT_PUBLIC_API}api/me`
  let data = {'email': 'test@test.com', 'password': 'test' }
  let token_end_point = `${process.env.NEXT_PUBLIC_API}sanctum/csrf-cookie`
    axios.post(url,data,{ withCredentials: true }).then(res => {
      console.log(res)
    }).catch(error => {
      const {
        status,
        statusText
      } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    })
  return (
    <HeaderGrid>
      <Typography>
        Header
      </Typography>
    </HeaderGrid>
  )
}
export default Header
