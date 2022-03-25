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
//components
import MoveHeader from '../components/Parts/Header/MoveHeader'
import Header from '../components/Parts/Header/Header'
import SearchBar from '../components/Parts/Matters/SearchBar'
import ResultArea from '../components/Parts/Matters/ResultArea'
const WrapeprGrid = styled(Grid)`
  margin: 0 auto;
  padding: 0;
  width: 100%;
`
const ContentsGrid = styled(Grid)`
  margin: 0 auto;
  padding-top: 2rem;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
`

const Matters = () => {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const [categories, setCategories] = useState(null)
  const [categoryDetail, setCategoryDetail] = useState(null)
  useEffect(() => {
    console.log(router)
    let backendToken = window.localStorage.getItem('token')
    setToken(backendToken)
    axios.post(`${process.env.NEXT_PUBLIC_API}api/get_matters`,router.category, {
      headers: {
        Authorization: `Bearer ${backendToken}`,
      }
    }).then((response) => {
      setCategories(response.data.matters.categories)
      setCategoryDetail(response.data.matters.category_detail)
    }).catch(error => {
      const {
        status,
        statusText
      } = error.response
    })
  }, [])
  const userInfo = (data) => {
    setUserData(data)
  }
  return(
    <WrapeprGrid>
      <MoveHeader />
      { token && 
        <Header token={token} userInfo={userInfo} />
      }
      <ContentsGrid>
        {categories && categoryDetail &&
          <SearchBar categories={categories} categoryDetail={categoryDetail} />
        }
        <ResultArea />
      </ContentsGrid>
    </WrapeprGrid>
  )
}
export default Matters