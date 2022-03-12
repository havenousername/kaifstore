import AppCarousel from './carousel/app-carousel';
import { CarouselProvider } from 'pure-react-carousel';
import React from 'react';
import useGetHttpUrl from '../hooks/use-get-http-url';
import noImage from '../assets/no-image.png';

const ProductDetailsImages = ({ images }: { images: string[] }) => {
  const getHttpUrl = useGetHttpUrl();
  return (
    <CarouselProvider
      visibleSlides={1}
      totalSlides={images.length === 0 ? 1 : images.length}
      naturalSlideHeight={200}
      naturalSlideWidth={200}
      infinite={true}
    >
      <AppCarousel
        items={
          images.length === 0
            ? [noImage.src]
            : images.map((image) => getHttpUrl(image))
        }
        sx={{ maxHeight: '400px' }}
      />
    </CarouselProvider>
  );
};

export default ProductDetailsImages;
