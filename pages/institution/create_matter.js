import React,{ useState, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
//components
import MoveHeader from '../../components/Parts/Header/MoveHeader'
const WrapeprGrid = styled(Grid)`
  margin: 0 auto;
  padding: 0;
  width: 100%;
`
const ContentWrapper = styled(Grid)`
  margin: 0 auto;
  padding: 0;
  max-width: 1024px;
`
const PageTitle = styled(Typography)`
  padding: 2rem;
  text-align: center;
  font-size: 2rem;
  background: #8fcc9b;
  margin-top: 1rem;
`
const CreateMatter = () => {
  return (
    <WrapeprGrid>
      <MoveHeader />
      <ContentWrapper>
        <PageTitle>案件登録</PageTitle>
      </ContentWrapper>
    </WrapeprGrid>
  )
}
export default CreateMatter