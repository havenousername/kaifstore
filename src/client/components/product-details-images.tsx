import AppCarousel from './app-carousel';
import { CarouselProvider } from 'pure-react-carousel';
import React from 'react';

const ProductDetailsImages = ({ images }: { images: string[] }) => {
  return (
    <CarouselProvider
      visibleSlides={1}
      totalSlides={images.length}
      naturalSlideHeight={200}
      naturalSlideWidth={200}
      infinite={true}
    >
      <AppCarousel items={images} sx={{ maxHeight: '400px' }} />
    </CarouselProvider>
  );
};

export default ProductDetailsImages;
