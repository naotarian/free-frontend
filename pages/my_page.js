import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCookies } from "react-cookie"
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
import MailIcon from '@mui/icons-material/Mail'
import Typography from '@mui/material/Typography'
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
const EditLinkTypo = styled(Typography)`
  cursor: pointer;
  color: #2e7d32;
`
const MyPage = () => {
  const router = useRouter()
  const { userInformationForm, handleSubmit } = useForm()
  const [userData, setUserData] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user_info'])
  const [pageNum, setPageNum] = useState(1)
  const [token, setToken] = useState('')
  //ページロード時発火
  useEffect(() => {
    let backendToken = window.localStorage.getItem('token')
    if(!backendToken) {
      //トークンがない場合はリダイレクト
      router.push('/auth/login')
    }
    setToken(backendToken)
  }, [])
  const createMatter = () => {
    router.push('/institution/create_matter')
  }
  //タブ切り替え処理
  const switchPage = () => {
    switch(pageNum) {
      case 1:
        return(
          <>
            {userData && (
              <InformationTable userData={userData} userInfo={userInfo} userInformationForm={userInformationForm} handleSubmit={handleSubmit} />
            )}
          </>
        )
      default:
        return(
          <>
            掲載情報
            <EditLinkTypo onClick={createMatter}>案件登録</EditLinkTypo>
          </>
        )
    }
  }
  const changeNum = (index) => {
    setPageNum(index + 1)
  }
  const userInfo = (data) => {
    setUserData(data)
  }
  return (
    <WrapeprGrid>
      <MoveHeader />
      { token && 
        <Header token={token} userInfo={userInfo} />
      }
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
        {userData && 
          <InformationField>
            {switchPage(pageNum)}
          </InformationField>
        }
      </FlexBox>
    </WrapeprGrid>
  )
}
export default MyPage