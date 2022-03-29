import React,{ useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import Theme from '../common/theme/index'
const SearchHeaderGrid = styled(Grid)`
  width: 100%;
  background: #205723;
`

const SearchHeader = (props) => {
  const {categories, token} = props
  const router = useRouter()
  const selectCategory = (text) => {
    router.push({
      pathname: `/matters`, // 遷移先のページ
      query: { source:text['category_id'], category:text['id'], name:text['name'] },
      as: '/matter'
    });
  }
  return (
    <SearchHeaderGrid>
      <ul className="search_list">
        {categories.map((text, index) => <li key={index} onClick={() => selectCategory(text)}>{text['name']}</li>)}
      </ul>
    </SearchHeaderGrid>
  )
}
export default SearchHeader
