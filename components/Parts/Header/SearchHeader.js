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

const SearchHeader = () => {
  return (
    <SearchHeaderGrid>
      <ul className="search_list">
        <li>エンジニア・プログラマー</li>
        <li>IT・Webコンサルタント</li>
        <li>Webデザイナー</li>
        <li>イラストレーター</li>
        <li>ボイストレーナー</li>
        <li>フォトグラファー</li>
        <li>映像クリエイター</li>
        <li>グラフィックデザイナー</li>
        <li>Webライター</li>
        <li>動画編集</li>
        <li>コピーライター</li>
        <li>ブロガー</li>
        <li>広告・PR</li>
        <li>スポーツトレーナー</li>
      </ul>
    </SearchHeaderGrid>
  )
}
export default SearchHeader
