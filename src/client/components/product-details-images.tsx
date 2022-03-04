import AppCarousel from './app-carousel';
import { CarouselProvider } from 'pure-react-carousel';
import React from 'react';
import useGetHttpUrl from '../hooks/use-get-http-url';

const ProductDetailsImages = ({ images }: { images: string[] }) => {
  const getHttpUrl = useGetHttpUrl();
  return (
    <CarouselProvider
      visibleSlides={1}
      totalSlides={images.length}
      naturalSlideHeight={200}
      naturalSlideWidth={200}
      infinite={true}
    >
      <AppCarousel
        items={images.map((image) => getHttpUrl(image))}
        sx={{ maxHeight: '400px' }}
      />
    </CarouselProvider>
  );
};

export default ProductDetailsImages;
