import { ImageWithZoom, Slide } from 'pure-react-carousel';
import { Box } from '@mui/material';
import React from 'react';
import { styled } from '@mui/styles';

const ImageWithZoomStyled = styled(ImageWithZoom)(() => ({
  borderRadius: '0.5625rem',
}));

const AppCarouselCardSlide = ({ index, sx, src }) => {
  return (
    <Slide index={index}>
      <Box width={'100%'} height={'100%'} sx={sx} position={'relative'}>
        <ImageWithZoomStyled src={src} />
      </Box>
    </Slide>
  );
};

export default AppCarouselCardSlide;
