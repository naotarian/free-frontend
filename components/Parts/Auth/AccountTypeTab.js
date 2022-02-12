import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

//mui
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const AccountTypeTab = (props) => {
  const {accountType, changeAccountType} = props
  const [value, setValue] = React.useState('business');
  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeAccountType(newValue)
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="general" label="一般アカウント" />
        <Tab value="business" label="ビジネスアカウント" />
      </Tabs>
    </Box>
  )
}
export default AccountTypeTab