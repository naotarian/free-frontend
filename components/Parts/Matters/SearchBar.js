import React,{ useState, useEffect, useRef } from 'react'
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
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
const SearchBarGrid = styled(Grid)`
  width: 300px;
`

const SearchBar = (props) => {
  const router = useRouter()
  const { categories, categoryDetail, loadMatters } = props
  const [age, setAge] = useState(router.query.source)
  const [defaultCategory, setDefaultCategory] = useState(router.query.category)
  const [menuCategoryDetail, setMenuCategoryDetail] = useState(null)
  const [categoryIdList, setCategoryIdList] = useState([router.query.category])
  const [load, setLoad] = useState(true)
  const isFirstRender = useRef(false)
  const [token, setToken] = useState(null)
  useEffect(() => {
    isFirstRender.current = true
  }, [])
  useEffect(() => {
    let tmpCategoryDetail = []
    categoryDetail.map((data, index) => {
      if(data.category_id == age) {
        tmpCategoryDetail.push(data)
      }
    })
    setMenuCategoryDetail(tmpCategoryDetail)
  }, [age])
  useEffect(() => {
    let backendToken = window.localStorage.getItem('token')
    setToken(backendToken)
    if(defaultCategory != null) {
      let default_param = {'category':defaultCategory}
      axios.post(`${process.env.NEXT_PUBLIC_API}api/default_matters`,default_param, {
        headers: {
          Authorization: `Bearer ${backendToken}`,
        }
      }).then((response) => {
        loadMatters(response.data)
      }).catch(error => {
        const {
          status,
          statusText
        } = error.response
      })
    }
  }, [defaultCategory])
  const handleChange = (event) => {
    setAge(event.target.value)
    setLoad(false)
  }
  const checkChange = (event) => {
    if(event.target.checked) {
      const newList = [...categoryIdList, event.target.value];
      setCategoryIdList(newList);
    } else {
      setCategoryIdList(
        categoryIdList.filter((cat, index) => (cat !== event.target.value))
      )
    }
  }
  useEffect(() => {
    if(isFirstRender.current) { // 初回レンダー判定
      isFirstRender.current = false // もう初回レンダーじゃないよ代入
    } else {
      axios.post(`${process.env.NEXT_PUBLIC_API}api/get_matters`,categoryIdList, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        loadMatters(response.data)
      }).catch(error => {
        const {
          status,
          statusText
        } = error.response
      })
    }
  }, [categoryIdList])
  return (
    <SearchBarGrid>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            条件で絞り込む
          </Typography>
          <TextField
            label="フリーワード"
            id="outlined-size-small"
            size="small"
          />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            カテゴリー
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              size="small"
            >
              { categories.map((text, index) => (
                <MenuItem value={text.id} key={index}>{text.name}</MenuItem>
              )) }
            </Select>
          </FormControl>
          <FormGroup>
            { menuCategoryDetail && menuCategoryDetail.map((text, index) => (
               load == true ? (
                text.id == router.query.category ? (
                  <FormControlLabel control={<Checkbox defaultChecked onChange={checkChange} value={text.id} />} label={text.name} key={index} />
                ) : (
                  <FormControlLabel control={<Checkbox  onChange={checkChange} value={text.id} />} label={text.name} key={index} />
                )
              ) : (
                <FormControlLabel control={<Checkbox defaultChecked  onChange={checkChange} value={text.id} />} label={text.name} key={index} />
              )
            )) }
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </SearchBarGrid>
  )
}
export default SearchBar