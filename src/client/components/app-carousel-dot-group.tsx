import { Box, Button, styled } from '@mui/material';

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
}: {
  slides: number;
  sizes?: [number, number];
  images: string[];
  onClick: (slide: number) => void;
  current: number;
}) => {
  return (
    <Box textAlign={'left'}>
      {[...Array(slides).keys()].map((slide) => (
        <Button
          key={slide}
          onClick={() => onClick(slide)}
          sx={{ borderRadius: '9px' }}
        >
          <Image
            width={sizes[0]}
            height={sizes[1]}
            src={images[slide]}
            alt={'dot group item'}
            aria-selected={slide === current}
          />
        </Button>
      ))}
    </Box>
  );
};

export default AppCarouselDotGroup;
