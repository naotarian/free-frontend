import * as React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import styled from 'styled-components'
//mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
//components
import MoveHeader from '../components/Parts/Header/MoveHeader'
import SearchHeader from '../components/Parts/Header/SearchHeader'
import Invitation from '../components/Parts/Invitation'
import SlideInformation from '../components/Parts/SlideInformation'
import UseCase from '../components/Parts/UseCase'
const StyledButton = styled(Button)`
  width: 300px;
`
const WrapeprGrid = styled(Grid)`
  margin: 0;
  padding: 0;
  width: 100%;
`

export default function Home() {
  return (
    <WrapeprGrid>
      <MoveHeader />
      <SearchHeader />
      <Invitation />
      <SlideInformation />
      <UseCase />
      詳しくは
      <Link href="/about">
        <a>こちら</a>
      </Link>
      をクリックしてください
      <Button />
      <Stack spacing={2} direction="row">
        <StyledButton variant="text">Text</StyledButton>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </WrapeprGrid>
  )
}
