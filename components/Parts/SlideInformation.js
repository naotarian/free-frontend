import React from 'react'
import Slider from "react-slick"
import Avatar from '@mui/material/Avatar'
import styled from 'styled-components'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
const SlideItemGrid = styled(Grid)`
  width: 90%!important;
  display: flex!important;
  margin: 0 auto;
  padding: 1rem;
`
const StyledSlider = styled(Slider)`
  text-align: center;
`
const StyledAvatar = styled(Avatar)`
  margin-right: 1rem;
`
const StyledTypography = styled(Typography)`
  line-height: 2rem!important;
`
const SlideInformation = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  return (
    <StyledSlider {...settings}>
      <SlideItemGrid>
        <StyledAvatar alt="Remy Sharp" src="/images/noimage.png" />
        <StyledTypography>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</StyledTypography>
      </SlideItemGrid>
      <SlideItemGrid>
        <StyledAvatar alt="Travis Howard" src="/images/noimage.png" />
        <StyledTypography>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</StyledTypography>
      </SlideItemGrid>
      <SlideItemGrid>
        <StyledAvatar alt="Cindy Baker" src="/images/noimage.png" />
        <StyledTypography>testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttest</StyledTypography>
      </SlideItemGrid>
    </StyledSlider>
  )
}
export default SlideInformation