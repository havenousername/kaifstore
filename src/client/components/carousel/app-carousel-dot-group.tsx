import { Box, Button, styled } from '@mui/material';
import { FC } from 'react';
import { SxProps } from '@mui/system';
import { ImageChangeProps } from '../../interfaces/image-change-props';

const Image = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  borderRadius: 8,
  '&[aria-selected="true"]': {
    border: `2px solid ${theme.palette.common.white}`,
  },
}));

const AppCarouselDotGroup = ({
  slides,
  sizes = [70, 70],
  images,
  onClick,
  current,
  Actions,
  sxItem,
  sx,
}: {
  slides: number;
  sizes?: [number, number];
  images: string[];
  onClick: (slide: number) => void;
  current: number;
  Actions?: FC<ImageChangeProps>;
  sxItem?: SxProps;
  sx?: SxProps;
}) => {
  return (
    <Box textAlign={'left'} sx={sx}>
      {[...Array(slides).keys()].map((slide) => (
        <Button
          key={slide}
          onClick={() => onClick(slide)}
          sx={{ borderRadius: '9px', ...sxItem }}
        >
          <Image
            width={sizes[0]}
            height={sizes[1]}
            src={images[slide]}
            alt={'dot group item'}
            aria-selected={slide === current}
          />
          {Actions && (
            <Actions
              slide={slide}
              sizeSx={{ width: '70px' }}
              canBeEdited={false}
            />
          )}
        </Button>
      ))}
    </Box>
  );
};

export default AppCarouselDotGroup;
