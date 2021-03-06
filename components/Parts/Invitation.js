import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
//mui
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { ThemeProvider } from '@mui/material/styles'
import Image from 'next/image'
//images
//components
import {theme} from '../common/theme/theme'
const InvitationGrid = styled(Grid)`
  padding: 1rem 4rem;
  display: flex;
  justify-content: space-between;
  background: #aed2d2;
`
const LeftGrid = styled(Grid)`
  width: 45%;
  padding-top: 5rem;
`
const RightGrid = styled(Grid)`
  width: 45%;
`
const StyledPaper = styled(Paper)`
  padding: 1rem;
  margin-bottom: 2rem;
`
const StyledFlexPaper = styled(StyledPaper)`
  display: flex;
  margin-top: 1rem;
`
const ReadTypography = styled(Typography)`
  color: #2e7d32;
  font-weight: bold!important;
  font-size: 2rem!important;
`
const StartButton = styled(Button)`
  margin-bottom: 1rem!important;
  width: 100%;
  padding: 1rem!important;
`
const Invitation = () => {
  return (
    <InvitationGrid>
      <ThemeProvider theme={theme}>
        <LeftGrid>
          <ReadTypography>
            その仕事、適した人材に任せよう。
          </ReadTypography>
            お仕事の依頼、相談ならfreeで完結。
          <StyledFlexPaper elevation={3}>
            <Grid className="w-45">
            <img src="/images/noimage.png" className="mw-100 w-45" />
            </Grid>
            <Grid className="w-45">
              <StartButton variant="contained" color={'secondary'}>今すぐ始める</StartButton>
              <Link href="/auth/login">
                <a><Typography>フリーランスの方はこちら</Typography></a>
              </Link>
            </Grid>
          </StyledFlexPaper>
        </LeftGrid>
        <RightGrid>
          <img src="/images/top.png" />
        </RightGrid>
      </ThemeProvider>
    </InvitationGrid>
  )
}
export default Invitation