import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
//mui
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Grid'
//icons
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
const StyledButton = styled(LoadingButton)`
  @media screen and (min-width:1024px) { 
    position: absolute;
    bottom: 25px;
    right: 25px;
  }
  @media screen and (max-width:767px) { 
    margin-top: 2rem;
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`
const EditAlert = styled(Alert)`
  margin-bottom: 2rem;
`
const EditLinkTypo = styled(Typography)`
  cursor: pointer;
  color: #2e7d32;
`
const StyledFormControl = styled(FormControl)`
  margin-bottom: 2rem;
`
const FlexGrid = styled(Grid)`
  display: flex;
`
const FlexItem = styled(Grid)`
  margin-right: 2rem;
`
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const InformationTable = (props) =>  {
  const { userData } = props
  const { register, handleSubmit } = useForm()
  const [emailErrFlag, setEmailErrFlag] = useState(false)
  const [userNameErrFlag, setUserNameErrFlag] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editMessageSuccess, setEditMessageSuccess] = useState(null)
  const [editMessageNotChange, setEditMessageNotChange] = useState(null)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [selectedCategoryIndex2, setSelectedCategoryIndex2] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCategory2, setSelectedCategory2] = useState('')
  const [nowCategory, setNowCategory] = useState(null)
  const [changeCategory, setChangeCategory] = useState(null)
  const category1 = ['IT・WEB', '写真・動画', '音楽']
  const category2 = [['WEBエンジニア', '組込系エンジニア','AIエンジニア'], ['イラストレーター', '動画編集', 'カメラマン'], ['ボイストレーナー']]
  const nowCategoryArray = ['WEBエンジニア', '組込系エンジニア','AIエンジニア','イラストレーター', '動画編集', 'カメラマン','ボイストレーナー']
  useEffect(() => {
    if(userData.occupation_detail_id != null) {
      setNowCategory(nowCategoryArray[userData.occupation_detail_id - 1])
    }
  }, [nowCategory])
  const onSubmit = (data) => {
    data.category1 = selectedCategoryIndex + 1
    data.category2 = selectedCategoryIndex2 + 1
    data.category1Name = selectedCategory
    data.category2Name = selectedCategory2
    //ボタンloading
    setLoading(true)
    //メールアドレス正規表現チェック
    let errFlag = false
    if(!data.user_name) {
      setLoading(false)
      setUserNameErrFlag(true)
      errFlag = true
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(data.email)) {
      setEmailErrFlag(true)
      setLoading(false)
      errFlag = true
    } else {
      setEmailErrFlag(false)
      setLoading(false)
    }
    //何かしらバリデーションで落ちたらpostしない
    if(errFlag) {
      return
    }
    data.id = userData.id
    let url = `${process.env.NEXT_PUBLIC_API}api/edit_user_information`
    //ユーザー情報更新post
    axios.post(url, data).then(res => {
      if(res.status == '200') {
        if(res.data.data.status) {
          setEditMessageSuccess(res.data.data.msg)
          setChangeCategory(nowCategoryArray[res.data.category_detail_id - 1])
          setTimeout(() => {
            setEditMessageSuccess(null)
          }, 3000)
        } else {
          setEditMessageNotChange(res.data.data.msg)
          setTimeout(() => {
            setEditMessageNotChange(null)
          }, 3000)
        }
        setLoading(false)
      } else {
        setLoading(false)
      }
    }).catch(error => {
      setLoading(false)
      const {
        status,
        statusText
      } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
    });
  }
  const handleChange = (event) => {
    setSelectedCategoryIndex(event.target.value)
    setSelectedCategory(category1[event.target.value])
    setSelectedCategory2(category2[event.target.value][0])
  };
  const handleChange2 = (event) => {
    setSelectedCategoryIndex2(event.target.value)
    setSelectedCategory2(category2[selectedCategoryIndex][event.target.value])
  };
  const category = () => {
    if(changeCategory) {
      return (
        <Typography>{changeCategory}</Typography>
      )
    } else if(nowCategory) {
      return (
        <Typography>{nowCategory}</Typography>  
      )
    } else {
      <Typography>設定なし</Typography>
    }
  }
  return (
    <React.Fragment>
      {editMessageSuccess && 
        <EditAlert severity="success">{editMessageSuccess}</EditAlert>
      }
      {editMessageNotChange && 
        <EditAlert severity="info">{editMessageNotChange}</EditAlert>
      }
      <TableContainer component={Paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  ユーザー名
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    label='ユーザー名'
                    id="outlined-size-small"
                    defaultValue={userData.user_name}
                    size="small"
                    error={userNameErrFlag}
                    {...register('user_name')}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  メールアドレス
                </TableCell>
                <TableCell component="th" scope="row">
                <TextField
                  label='メールアドレス'
                  id="outlined-size-small"
                  defaultValue={userData.email}
                  size="small"
                  error={emailErrFlag}
                  {...register('email')}
                />
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  職種
                </TableCell>
                <TableCell component="th" scope="row">
                  <FlexGrid>
                    <FlexItem>
                      {category()}
                      <EditLinkTypo onClick={handleOpen}>設定を変更</EditLinkTypo>
                    </FlexItem>
                    <Grid>
                      {selectedCategory &&
                        <Typography>職種1 : {selectedCategory}を選択中</Typography>
                      }
                      {selectedCategory2 &&
                        <Typography>職種2 : {selectedCategory2}を選択中</Typography>
                      }
                    </Grid>
                  </FlexGrid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <StyledButton variant="contained" color={'primary'} startIcon={<ChangeCircleIcon />} type="submit" loading={loading}>更新</StyledButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <StyledFormControl fullWidth>
              <InputLabel id="demo-simple-select-label">職種1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategoryIndex}
                label="職種1"
                onChange={handleChange}
              >
                {category1.map((text, index) => (
                  <MenuItem value={index} key={index}>{text}</MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">職種2</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategoryIndex2}
                label="職種2"
                onChange={handleChange2}
              >
                {category2[selectedCategoryIndex].map((text, index) => (
                  <MenuItem value={index} key={index}>{text}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Modal>
        </form>
      </TableContainer>
    </React.Fragment>
  );
}
export default InformationTable