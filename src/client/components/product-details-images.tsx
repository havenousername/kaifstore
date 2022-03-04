import AppCarousel from './app-carousel';
import { CarouselProvider } from 'pure-react-carousel';
import React, { useCallback } from 'react';

const ProductDetailsImages = ({ images }: { images: string[] }) => {
  const hasHttp = useCallback(
    (str: string) => str.includes('http') || str.includes('https'),
    [],
  );
  const getUrl = useCallback(
    (str: string) =>
      hasHttp(str) ? str : `${process.env.NEXT_PUBLIC_ROOT_URL}/${str}`,
    [hasHttp],
  );
  return (
    <CarouselProvider
      visibleSlides={1}
      totalSlides={images.length}
      naturalSlideHeight={200}
      naturalSlideWidth={200}
      infinite={true}
    >
      <AppCarousel
        items={images.map((image) => getUrl(image))}
        sx={{ maxHeight: '400px' }}
      />
    </CarouselProvider>
  );
};

export default ProductDetailsImages;
