import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
//components
import MoveHeader from '../components/Parts/Header/MoveHeader'
import Header from '../components/Parts/Header/Header'
import InformationTable from '../components/Parts/MyPage/InformationTable'
//mui
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
const WrapeprGrid = styled(Grid)`
  margin: 0;
  padding: 0;
  width: 100%;
`
const InformationField = styled(Grid)`
  width: 100%;
  padding: 2rem;
`
const StyledSideBox = styled(Box)`
  width: 20%;
  height: 100vh;
  background: #eee;
`
const FlexBox = styled(Box)`
  display: flex;
`
const MyPage = () => {
  const router = useRouter()
  const [token, setToken] = useState('')
  const { userInformationForm, handleSubmit } = useForm()
  const [userData, setUserData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  useEffect(() => {
    let backendToken = window.localStorage.getItem('token')
    if(!backendToken) {
      router.push('/')
    }
    setToken(backendToken)
      //ログインチェック
    let data = {}
    axios.post(`${process.env.NEXT_PUBLIC_API}api/me`,data, {
      headers: {
        Authorization: `Bearer ${backendToken}`,
      }
    }).then((response) => {
      if(response.data) {
        console.log(response.data)
        setUserData(response.data)
      } else {
        router.push('/')
      }
    }).catch(error => {
      const {
        status,
        statusText
      } = error.response
    })
      setToken(backendToken)
  }, [])
    
  const switchPage = () => {
    switch(pageNum) {
      case 1:
        return(
          <>
            {userData && (
              <InformationTable userData={userData} userInformationForm={userInformationForm} handleSubmit={handleSubmit} />
            )}
          </>
        )
      default:
        return(
          <>
            掲載情報
          </>
        )
    }
  }
  const changeNum = (index) => {
    setPageNum(index + 1)
  }
  return (
    <WrapeprGrid>
      <MoveHeader />
      <FlexBox>
        <StyledSideBox>
          <List>
            {['ユーザー基本情報', '掲載情報'].map((text, index) => (
              <ListItem button key={text} onClick={() => changeNum(index)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </StyledSideBox>
        
        <InformationField>
          {switchPage(pageNum)}
        </InformationField>
      </FlexBox>
    </WrapeprGrid>
  )
}
export default MyPage