import { ImageWithZoom, Slide } from 'pure-react-carousel';
import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
import { styled } from '@mui/styles';
import { SxProps } from '@mui/system';

const ImageWithZoomStyled = styled(ImageWithZoom)(() => ({
  borderRadius: '0.5625rem',
}));

const AppCarouselCardSlide = ({
  index,
  sx,
  src,
}: {
  index: number;
  src: string | ReactNode;
  sx: SxProps;
}) => {
  return (
    <Slide index={index}>
      <Box width={'100%'} height={'100%'} sx={sx} position={'relative'}>
        {typeof src === 'string' ? <ImageWithZoomStyled src={src} /> : src}
      </Box>
    </Slide>
  );
};

export default AppCarouselCardSlide;
