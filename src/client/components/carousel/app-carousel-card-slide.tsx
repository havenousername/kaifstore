import { ImageWithZoom, Slide } from 'pure-react-carousel';
import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { styled } from '@mui/styles';
import { SxProps } from '@mui/system';
import { ImageChangeProps } from '../../interfaces/image-change-props';

const ImageWithZoomStyled = styled(ImageWithZoom)(() => ({
  borderRadius: '0.5625rem',
}));

const AppCarouselCardSlide = ({
  index,
  sx,
  src,
  Actions,
}: {
  index: number;
  src: string | ReactNode;
  sx: SxProps;
  Actions?: FC<ImageChangeProps>;
}) => {
  return (
    <Slide index={index}>
      <Box width={'100%'} height={'100%'} sx={sx} position={'relative'}>
        {typeof src === 'string' ? <ImageWithZoomStyled src={src} /> : src}
        {Actions && (
          <Actions
            slide={index}
            sizeSx={{ width: '100%', maxWidth: '400px', fontSize: '1rem' }}
          />
        )}
      </Box>
    </Slide>
  );
};

export default AppCarouselCardSlide;
