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
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
const SearchBarGrid = styled(Grid)`
  width: 300px;
`

const SearchBar = (props) => {
  const { categories } = props
  const [age, setAge] = React.useState('')
  const handleChange = (event) => {
    console.log(event.target.value)
    setAge(event.target.value)
  }
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
            カテゴリ
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              size="small"
            >
              { categories.map((text, index) => (
                <MenuItem value={text.id}>{text.name}</MenuItem>
              )) }
            </Select>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </SearchBarGrid>
  )
}
export default SearchBar