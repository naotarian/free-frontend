import React,{ useState, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'
import styled from 'styled-components'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
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
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import jaLocale from 'date-fns/locale/ja'
import isWeekend from 'date-fns/isWeekend'
import LoadingButton from '@mui/lab/LoadingButton'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
//icons
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AddIcon from '@mui/icons-material/Add'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
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
const TitleTypo = styled(Typography)`
  color: #616161;
  font-size: 1.2rem;
  margin-top: 1rem;
`
const SettingArea = styled(Grid)`
  padding: 2rem;
`
const SettingItem = styled(Grid)`
  margin-bottom: 2rem;
`
const ButtonArea = styled(Grid)`
  display: flex;
  width: 100%;
  justify-content: end;
`
const StyledButton = styled(LoadingButton)`
  margin-left: 1rem;
`
const StyledDeleteButton = styled(LoadingButton)`
  height: 32px;
`
const ContentArea = styled(TextField)`
  width: 100%;
`
const TitleFlex = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 3px;
`
const CreateMatter = () => {
  const [value, setValue] = useState(new Date())
  const [contentsNum, setContentsNum] = useState(1)
  const { register, handleSubmit } = useForm()
  const [contents, setContents] = useState([{}])
  const [defaultContentNum, setDefaultContentNum] = useState([1])
  const [contentOver, setContentOver] = useState(false)
  // const [contents, setContents] = useState([{'title':'test1','content':'test1'},{'title':'test2','content':'test2'}])
  const [loading, setLoading] = useState(false)
  const onSubmit = (datas) => {
    datas.yaer = value ? value.getFullYear() : null
    datas.month = value ? value.getMonth() + 1 : null
    datas.day = value ? value.getDate() : null
    console.log(datas)
  }
  const addContent = () => {
    let tmpContentNum = defaultContentNum.length + 1
    let tmpContentNumArray = []
    for(let i = 0; i < tmpContentNum; i++) {
      tmpContentNumArray.push(i + 1)
    }
    if(tmpContentNum - 1 < 10) {
      setDefaultContentNum(tmpContentNumArray)
    } else {
      setContentOver(true)
      setTimeout(() => {
        setContentOver(false)
      }, 5000)
    }
  }
  const deleteContent = (data) => {
    let tmpContentNum = defaultContentNum.length
    let tmpContentNumArray = []
    for(let i = 0; i < tmpContentNum; i++) {
      if(i != data) {
        tmpContentNumArray.push(i + 1)
      }
    }
    console.log(tmpContentNumArray)
    setDefaultContentNum(tmpContentNumArray)
  }
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <WrapeprGrid>
      <MoveHeader />
      <ContentWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageTitle>案件登録</PageTitle>
          <SettingArea>
            <SettingItem>
              <TitleTypo>公開日設定</TitleTypo>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  orientation="landscape"
                  openTo="day"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField value={params} {...params} {...register('date')} />}
                />
              </LocalizationProvider>
            </SettingItem>
            { defaultContentNum.map((text, index) => (
                <SettingItem key={index}>
                  <TitleFlex>
                    <TitleTypo>タイトル{text}</TitleTypo>
                    { index != 0 && 
                      <StyledButton variant="contained" color='warning' size="small" startIcon={<DeleteForeverIcon />} type="button" onClick={() => deleteContent(index)} loading={loading}>コンテンツ削除</StyledButton>
                    }
                  </TitleFlex>
                  <TextField fullWidth id="fullWidth" defaultValue='タイトル' {...register(`title${index + 1}`)} />
                  <TitleTypo>説明文{text}</TitleTypo>
                  <ContentArea
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    rows={8}
                    {...register(`content${index + 1}`)}
                    defaultValue='内容'
                  />
                </SettingItem>
              ))}
          <ButtonArea>
            <StyledButton variant="contained" color='info' startIcon={<AddIcon />} type="button" onClick={addContent} loading={loading}>コンテンツ追加</StyledButton>
            <StyledButton variant="contained" color={'primary'} startIcon={<ChangeCircleIcon />} type="submit" loading={loading}>更新</StyledButton>
          </ButtonArea>
          </SettingArea>
        </form>
      </ContentWrapper>
      <Dialog
        open={contentOver}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"コンテンツ設定可能上限を超えました"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            設定できるコンテンツは10個までです。
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </WrapeprGrid>
  )
}
export default CreateMatter