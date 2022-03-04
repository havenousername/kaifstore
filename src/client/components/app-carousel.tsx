import { CarouselContext, Slider } from 'pure-react-carousel';
import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import AppCarouselCardSlide from './app-carousel-card-slide';
import AppCarouselDotGroup from './app-carousel-dot-group';
import { ReactComponent as ArrowIcon } from '../assets/icons/left-arrow.svg';
import { Box } from '@mui/material';

const AppCarousel = ({
  items,
  sx,
  beforeContentComponent,
  nextButton,
  showNextButton = true,
  prevButton,
  showPrevButton = true,
}: {
  items: (string | ReactNode)[];
  sx?: CSSProperties;
  beforeContentComponent?: ReactNode;
  nextButton?: FunctionComponent<{
    onClick(): void;
  }>;
  prevButton?: FunctionComponent<{
    onClick(): void;
  }>;
  showNextButton?: boolean;
  showPrevButton?: boolean;
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
    positionX: [string, string],
    onClick: () => void,
  ) => (
    <Box
      sx={{
        position: 'absolute',
        [positionX[0]]: [positionX[1]],
        bottom: 90,
        cursor: 'pointer',
        '& svg': {
          transform: positionX[0] === 'left' ? 'scaleX(1)' : 'scaleX(-1)',
        },
      }}
      onClick={onClick}
      className={'slide-button'}
    >
      <ArrowIcon />
    </Box>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      {beforeContentComponent ?? null}
      <Box sx={sx}>
        <Slider style={sx}>
          {items.map((image, index) => (
            <AppCarouselCardSlide
              src={image}
              sx={{ maxHeight: sx.maxHeight }}
              index={index}
              key={index}
            />
          ))}
        </Slider>
        {showPrevButton &&
          (prevButton ?? changeSlideButton(['left', '1.4rem'], onPrevClick))}
        {showNextButton &&
          (nextButton ?? changeSlideButton(['right', '1.4rem'], onNextClick))}
      </Box>
      {typeof items[0] === 'string' && (
        <AppCarouselDotGroup
          onClick={(slide) =>
            carouselContext.setStoreState({ currentSlide: slide })
          }
          current={currentSlide}
          images={items as string[]}
          slides={items.length}
        />
      )}
    </Box>
  );
};

export default AppCarousel;
