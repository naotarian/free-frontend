import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import styled from 'styled-components'
//mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
//components
import MoveHeader from '../components/Parts/Header/MoveHeader'
import Header from '../components/Parts/Header/Header'
import SearchHeader from '../components/Parts/Header/SearchHeader'
import Invitation from '../components/Parts/Invitation'
import SlideInformation from '../components/Parts/SlideInformation'
import UseCase from '../components/Parts/UseCase'
import store from "../redux/store"
const StyledButton = styled(Button)`
  width: 300px;
`
const WrapeprGrid = styled(Grid)`
  margin: 0;
  padding: 0;
  width: 100%;
`

export default function Home() {
  const [token, setToken] = useState('')
  const [categories, setCategories] = useState([])
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    let backendToken = window.localStorage.getItem('token')
    let data = {}
    let url = `${process.env.NEXT_PUBLIC_API}api/index_get`
    axios.post(url,data, {
      headers: {
        Authorization: `Bearer ${backendToken}`,
      }
    }).then((response) => {
      if(response.data.default_info.categories) {
        setCategories(response.data.default_info.categories)
      }
    }).catch(error => {
      const {
        status,
        statusText
      } = error.response
    })
    setToken(backendToken)
  }, [])
  const userInfo = (data) => {
    setUserData(data)
  }
  return (
    <WrapeprGrid>
      <MoveHeader />
      { token && 
        <Header token={token} userInfo={userInfo} />
      }
      {categories && 
        <SearchHeader categories={categories} token={token} />
      }
      <Invitation />
      <SlideInformation />
      <UseCase />
      詳しくは
      <Link href="/about">
        <a>こちら</a>
      </Link>
      をクリックしてください
      <Button />
      <Stack spacing={2} direction="row">
        <StyledButton variant="text">Text</StyledButton>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </WrapeprGrid>
  )
}
