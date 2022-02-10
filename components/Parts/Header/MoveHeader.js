import React,{ useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import Theme from '../common/theme/index'
const MoveHeaderGrid = styled(Grid)`
  width: 100%;
  background: #2e7d32;
`

const MoveHeader = () => {
  return (
    <MoveHeaderGrid>
      <div className="news-banner">
        <div className="news-banner__content">
          <p>お知らせテキストをここに入れてください！</p>
        </div>
      </div>
    </MoveHeaderGrid>
  )
}
export default MoveHeader
