import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
const TokenGrid = styled(Grid)`
  width: 100%;
  padding: 2rem;
`
const Token = () => {
  const router = useRouter();
  // パスパラメータから値を取得
  const token = router.query;
  const [loading, setLoading] = useState(false)
  const submit = () => {
    const url = `${process.env.NEXT_PUBLIC_API}api/main_register`
    setLoading(true)
    axios.post(url, token).then(res => {
      router.push('/')
    })
  }
  return (
    <TokenGrid>
      <Typography>
        この度は本サービスを登録いただき誠にありがとうございます。<br />
        現在仮登録が完了しておりますので、本人確認後にサービスをご利用いただけます。
      </Typography>
      <LoadingButton variant="contained" loading={loading} color={'primary'} onClick={submit} type="submit">本人確認</LoadingButton>
    </TokenGrid>
  );
};

export default Token