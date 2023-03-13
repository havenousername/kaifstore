import { CarouselContext, Slider } from 'pure-react-carousel';
import React, {
  CSSProperties,
  FC,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import AppCarouselCardSlide from './app-carousel-card-slide';
import AppCarouselDotGroup from './app-carousel-dot-group';
import { ReactComponent as ArrowIcon } from '../../assets/icons/left-arrow.svg';
import { Box } from '@mui/material';
import { SxProps } from '@mui/system';
import { ImageChangeProps } from '../../interfaces/image-change-props';

const AppCarousel = ({
  items,
  sx,
  sxRoot,
  beforeContentComponent,
  nextButton,
  showNextButton = true,
  prevButton,
  showPrevButton = true,
  prevButtonPosition,
  nextButtonPosition,
  dotGroupActions,
  sxSlider,
  contentActions,
  sxDotGroupItem,
  sxDot,
}: {
  items: (string | ReactNode)[];
  sx?: CSSProperties;
  sxRoot?: SxProps;
  sxSlider?: SxProps;
  sxDotGroupItem?: SxProps;
  sxDot?: SxProps;
  beforeContentComponent?: ReactNode;
  nextButton?: FunctionComponent<{
    onClick(): void;
  }>;
  prevButton?: FunctionComponent<{
    onClick(): void;
  }>;
  showNextButton?: boolean;
  showPrevButton?: boolean;
  prevButtonPosition?: [[string, string], [string, string]];
  nextButtonPosition?: [[string, string], [string, string]];
  dotGroupActions?: FC<ImageChangeProps>;
  contentActions?: FC<ImageChangeProps>;
}) => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide,
  );

  useEffect(() => {
    function onChange() {
      setCurrentSlide(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  const onNextClick = () => {
    let stepped = currentSlide + carouselContext.state.step;
    if (stepped > items.length - 1 && !carouselContext.state.infinite) {
      return;
    } else if (stepped > items.length - 1 && carouselContext.state.infinite) {
      stepped = 0;
    }
    carouselContext.setStoreState({ currentSlide: stepped });
  };

  const onPrevClick = () => {
    let stepped = currentSlide - carouselContext.state.step;
    if (stepped < 0 && !carouselContext.state.infinite) {
      return;
    } else if (stepped < 0 && carouselContext.state.infinite) {
      stepped = items.length - 1;
    }
    carouselContext.setStoreState({ currentSlide: stepped });
  };

  const changeSlideButton = (
    position: [[string, string], [string, string]],
    onClick: () => void,
  ) => (
    <Box
      sx={{
        position: 'absolute',
        [position[0][0]]: position[0][1],
        [position[1][0]]: position[1][1],
        cursor: 'pointer',
        '& svg': {
          transform: position[0][0] === 'left' ? 'scaleX(1)' : 'scaleX(-1)',
        },
      }}
      onClick={onClick}
      className={'slide-button'}
    >
      <ArrowIcon />
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', ...sxRoot }}>
      {beforeContentComponent ?? null}
      <Box sx={sx}>
        <Slider style={sx}>
          {items.map((image, index) => (
            <AppCarouselCardSlide
              src={image}
              sx={{ maxHeight: sx?.maxHeight, ...sxSlider }}
              index={index}
              key={index}
              Actions={contentActions}
            />
          ))}
        </Slider>
        {showPrevButton &&
          (prevButton ??
            changeSlideButton(
              prevButtonPosition ?? [
                ['left', '1.4rem'],
                ['bottom', '90px'],
              ],
              onPrevClick,
            ))}
        {showNextButton &&
          (nextButton ??
            changeSlideButton(
              nextButtonPosition ?? [
                ['right', '1.4rem'],
                ['bottom', '90px'],
              ],
              onNextClick,
            ))}
      </Box>
      {typeof items[0] === 'string' && (
        <AppCarouselDotGroup
          onClick={(slide) =>
            carouselContext.setStoreState({ currentSlide: slide })
          }
          current={currentSlide}
          images={items as string[]}
          slides={items.length}
          Actions={dotGroupActions}
          sxItem={sxDotGroupItem}
          sx={{
            ...sxDot,
          }}
        />
      )}
    </Box>
  );
};

export default AppCarousel;
