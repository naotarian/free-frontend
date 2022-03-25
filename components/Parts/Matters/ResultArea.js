import React,{ useState, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'
import styled from 'styled-components'
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
const ResultAreaWrapper = styled(Grid)`
  width: 600px;
`
const ResultCard = styled(Card)`
  width: 100%;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 7px 2px 27px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`
const ResultArea = () => {
  const [token, setToken] = useState(null)
  let backendToken = window.localStorage.getItem('token')
  const router = useRouter()
  if(!backendToken) {
    //トークンがない場合はリダイレクト
    router.push('/auth/login')
  }
  let url = `${process.env.NEXT_PUBLIC_API}api/get_matters`
  const datas = []
  axios.post(url, datas, {
    headers: {
      Authorization: `Bearer ${backendToken}`,
    }
  }).then(res => {
    console.log(res)
  }).catch(error => {
    const {
      status,
      statusText
    } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
  });
  return (
    <ResultAreaWrapper>
      <ResultCard>test</ResultCard>
      <ResultCard>test</ResultCard>
      <ResultCard>test</ResultCard>
      <ResultCard>test</ResultCard>
    </ResultAreaWrapper>
  )
}
export default ResultArea