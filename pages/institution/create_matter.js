import React,{ useState, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'
import styled from 'styled-components'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { animateScroll as scroll } from "react-scroll"
import { useCookies } from "react-cookie"
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
import Alert from '@mui/material/Alert'
//icons
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AddIcon from '@mui/icons-material/Add'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
//components
import MoveHeader from '../../components/Parts/Header/MoveHeader'
import Header from '../../components/Parts/Header/Header'
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
const ErrAlert = styled(Alert)`
  margin-top: 2rem;
`
const CreateMatter = () => {
  const [value, setValue] = useState(new Date())
  const [contentsNum, setContentsNum] = useState(1)
  const { register, handleSubmit } = useForm()
  const [userData, setUserData] = useState(null)
  const [contents, setContents] = useState([{}])
  const [defaultContentNum, setDefaultContentNum] = useState([1])
  // const [defaultContentNum, setDefaultContentNum] = useState([{sub_title: 'サブタイトル1', content: '内容1'}])
  const [defaultSet, setDefaultSet] = useState([{sub_title: 'サブタイトル1', content: 'aaaaa'}])
  const [contentOver, setContentOver] = useState(false)
  const [token, setToken] = useState(null)
  const [subTitleLengthErr, setSubTitleLengthErr] = useState(false)
  const [contentsLengthErr, setContentsLengthErr] = useState(false)
  const [titleExe, setTitleExe] = useState(false)
  const [titleLengthErr, setTitleLengthErr] = useState(false)
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['user_info'])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let backendToken = window.localStorage.getItem('token')
    if(!backendToken) {
      //トークンがない場合はリダイレクト
      router.push('/auth/login')
    }
    setToken(backendToken)
  }, [])
  const onSubmit = (datas) => {
    if(datas.title == '') {
      scroll.scrollToTop()
      setTitleExe(true)
      setTimeout(() => {
        setTitleExe(false)
      }, 3000)
      return
    }
    if(datas.title.length > 100) {
      scroll.scrollToTop()
      setTitleLengthErr(true)
      setTimeout(() => {
        setTitleLengthErr(false)
      }, 3000)
      return
    }
    //cookieからデータ取得する
    datas.user_id = cookies.user_info.id
    datas.occupation_id = cookies.user_info.occupation_id
    datas.occupation_detail_id = cookies.user_info.occupation_detail_id
    datas.yaer = value ? value.getFullYear() : null
    datas.month = value ? value.getMonth() + 1 : null
    datas.day = value ? value.getDate() : null
    datas.data = defaultSet
    console.log(datas)
    let url = `${process.env.NEXT_PUBLIC_API}api/create_matters`
    axios.post(url, datas, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(res => {
    }).catch(error => {
      setLoading(false)
      const {
        status,
        statusText
      } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    });
  }
  
  const addContent = () => {
    console.log(defaultSet)
    if(defaultSet.length > 10) {
      console.log('追加コンテンツは10個までです。')
      return
    }
    const newSet = [...defaultSet, {sub_title: 'タイトル', content: '内容'}]
    console.log(newSet)
    setDefaultSet(newSet)
  }
  
  //コンテンツ削除時
  const deleteContent = (data) => {
    setDefaultSet(
        defaultSet.filter((content, index) => (index != data))
    )
    console.log(data)
  }
  const userInfo = (data) => {
    setUserData(data)
  }
  //テキストエリアstate更新
  const contentChange = (event, key) => {
    setDefaultSet(
      defaultSet.map((content, index) => (index == key ? {sub_title: content.sub_title, content: event.target.value} : content))
    )
  }
  // サブタイトルstate更新
  const subTitleChange = (event, key) => {
    setDefaultSet(
      defaultSet.map((content, index) => (index == key ? {sub_title: event.target.value, content: content.content} : content))
    )
  }
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <WrapeprGrid>
      <MoveHeader />
      { token && 
        <Header token={token} userInfo={userInfo} />
      }
      <ContentWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageTitle>案件登録</PageTitle>
            {titleLengthErr && (
              <ErrAlert severity="error">タイトルの最大文字数は100文字です。</ErrAlert>
            )}
            {titleExe && (
              <ErrAlert severity="error">タイトルは必須項目です。</ErrAlert>
            )}
            {subTitleLengthErr && (
              <ErrAlert severity="error">サブタイトルの最大文字数は100文字です。</ErrAlert>
            )}
            {contentsLengthErr && (
              <ErrAlert severity="error">コンテンツの最大文字数は3000文字です。</ErrAlert>
            )}
          <SettingArea>
            <SettingItem>
              <TitleTypo>案件タイトル(最大100文字)</TitleTypo>
              <TextField fullWidth id="fullWidth" defaultValue='案件タイトル' {...register('title')} />
            </SettingItem>
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
            { defaultSet && Object.entries(defaultSet).map(([key, value]) => (
               <SettingItem key={key}>
                  <TitleFlex>
                    <TitleTypo>サブタイトル{Number(key) + 1}(最大100文字)</TitleTypo>
                    { key != 0 && 
                      <StyledButton variant="contained" color='warning' size="small" startIcon={<DeleteForeverIcon />} type="button" onClick={() => deleteContent(key)} loading={loading}>コンテンツ削除</StyledButton>
                    }
                  </TitleFlex>
                  <TextField fullWidth id="fullWidth" onBlur={() => subTitleChange(event, key)} defaultValue={value.sub_title} />
                  <TitleTypo>説明文{Number(key) + 1}(最大3000文字)</TitleTypo>
                  <ContentArea
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    rows={8}
                    defaultValue={value.content}
                    onBlur={() => contentChange(event, key)}
                  />
                </SettingItem>
              )) 
            }
            { defaultSet && Object.entries(defaultSet).map(([key, value]) => {
              console.log(value.content)
            })}
          <ButtonArea>
            <StyledButton variant="contained" color='info' startIcon={<AddIcon />} type="button" onClick={addContent} loading={loading}>コンテンツ追加</StyledButton>
            <StyledButton variant="contained" color={'primary'} startIcon={<ChangeCircleIcon />} type="submit" loading={loading}>作成</StyledButton>
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