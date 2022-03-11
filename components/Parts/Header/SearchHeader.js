import React,{ useState, useEffect } from 'react'
import styled from 'styled-components'
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import Theme from '../common/theme/index'
const SearchHeaderGrid = styled(Grid)`
  width: 100%;
  background: #205723;
`

const SearchHeader = (props) => {
  const {categories} = props
  const selectCategory = (id) => {
    console.log(id)
  }
  return (
    <SearchHeaderGrid>
      <ul className="search_list">
        {categories.map((text, index) => <li key={index} onClick={() => selectCategory(text['id'])}>{text['name']}</li>)}
      </ul>
    </SearchHeaderGrid>
  )
}
export default SearchHeader
