import React from 'react'
import styled from 'styled-components'
//mui
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Slider from "react-slick"
const UseCaseWrapperGrid = styled(Grid)`
  padding: 1rem;
  background: #cce8ec;
`
const UseCaseTypography = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #333;
`
const FlexPaper = styled(Paper)`
  width: 30%;
  height: 250px;
  padding: 1rem;
`
const AlternateGrid = styled(Grid)`
  width: 50%;
  padding: 1rem;
`
const FlexSlider = styled(Slider)`
  width: 30%;
`

const UseCase = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  return (
    <UseCaseWrapperGrid>
      <UseCaseTypography>こんなケースで使われています</UseCaseTypography>
      <ul className="alternate_flex_ul">
        <li className="flex_list">
          <AlternateGrid>
            <Typography>「未経験からエンジニア、デザイナーを目指している」</Typography>
            <ul>
              <li>プログラミングの学習をはじめたけど、何をどこまでやればいいの？」</li>
              <li>「自分がやっている勉強法は効率的なんだろうか」</li>
              <li>「どこまで学習すれば案件獲得できる？」</li>
              <li>どんなポートフォリオをつくればいいか相談したい、添削してほしい」</li>
            </ul>
            <Typography>
              目指すゴールによって道のりはさまざまです。初心者にとっては登るべき山の全体像が見えづらいもの。
              そんなときこそ、すでに現役で活躍しているエンジニア、デザイナーに直接相談するのがいいでしょう。学習法やロードマップ、具体的なコードの相談などをすることができます。
            </Typography>
          </AlternateGrid>
          <FlexSlider {...settings}>
            <FlexPaper elevation={3}>
              メンター紹介
            </FlexPaper>
            <FlexPaper elevation={3}>
              メンター紹介
            </FlexPaper>
            <FlexPaper elevation={3}>
              メンター紹介
            </FlexPaper>
          </FlexSlider>
        </li>
        <li className="flex_list">
          <AlternateGrid>
            <Typography>「未経験からエンジニア、デザイナーを目指している」</Typography>
            <ul>
              <li>プログラミングの学習をはじめたけど、何をどこまでやればいいの？」</li>
              <li>「自分がやっている勉強法は効率的なんだろうか」</li>
              <li>「どこまで学習すれば案件獲得できる？」</li>
              <li>どんなポートフォリオをつくればいいか相談したい、添削してほしい」</li>
            </ul>
            <Typography>
              目指すゴールによって道のりはさまざまです。初心者にとっては登るべき山の全体像が見えづらいもの。
              そんなときこそ、すでに現役で活躍しているエンジニア、デザイナーに直接相談するのがいいでしょう。学習法やロードマップ、具体的なコードの相談などをすることができます。
            </Typography>
          </AlternateGrid>
          <FlexSlider {...settings}>
            <FlexPaper elevation={3}>
              test1
            </FlexPaper>
            <FlexPaper elevation={3}>
              test2
            </FlexPaper>
            <FlexPaper elevation={3}>
              test3
            </FlexPaper>
          </FlexSlider>
        </li>
        <li className="flex_list">
          <AlternateGrid>
            <Typography>「未経験からエンジニア、デザイナーを目指している」</Typography>
            <ul>
              <li>プログラミングの学習をはじめたけど、何をどこまでやればいいの？」</li>
              <li>「自分がやっている勉強法は効率的なんだろうか」</li>
              <li>「どこまで学習すれば案件獲得できる？」</li>
              <li>どんなポートフォリオをつくればいいか相談したい、添削してほしい」</li>
            </ul>
            <Typography>
              目指すゴールによって道のりはさまざまです。初心者にとっては登るべき山の全体像が見えづらいもの。
              そんなときこそ、すでに現役で活躍しているエンジニア、デザイナーに直接相談するのがいいでしょう。学習法やロードマップ、具体的なコードの相談などをすることができます。
            </Typography>
          </AlternateGrid>
          <FlexSlider {...settings}>
            <FlexPaper elevation={3}>
              test1
            </FlexPaper>
            <FlexPaper elevation={3}>
              test2
            </FlexPaper>
            <FlexPaper elevation={3}>
              test3
            </FlexPaper>
          </FlexSlider>
        </li>
      </ul>
    </UseCaseWrapperGrid>
  )
}
export default UseCase