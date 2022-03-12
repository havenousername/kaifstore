import AppCarousel from './carousel/app-carousel';
import { Box, Typography } from '@mui/material';
import ProductCard from './product-card';
import React, { MouseEvent } from 'react';
import { CarouselProvider } from 'pure-react-carousel';
import { Product } from '../../backend/model/products.model';

const CarouselProducts = ({
  products,
  onClick,
  emptyText,
}: {
  products: Product[];
  onClick: (e: MouseEvent, pr: Product) => void;
  emptyText: string;
}) => {
  if (!products || products.length === 0) {
    return (
      <>
        <Typography variant={'h5'} fontWeight={'500'}>
          {emptyText}
        </Typography>
      </>
    );
  }
  return (
    <CarouselProvider
      visibleSlides={2}
      interval={20}
      totalSlides={products.length}
      naturalSlideHeight={200}
      naturalSlideWidth={200}
      infinite={true}
    >
      <AppCarousel
        prevButtonPosition={[
          ['left', '-10px'],
          ['bottom', '90px'],
        ]}
        nextButtonPosition={[
          ['right', '-40px'],
          ['bottom', '90px'],
        ]}
        sx={{
          height: '500px',
        }}
        items={products.map((last, key) => (
          <Box marginLeft={'2rem'} key={key}>
            <ProductCard
              product={last}
              onCardTitleClick={(e, p) => {
                onClick(e, p);
              }}
            />
          </Box>
        ))}
      />
    </CarouselProvider>
  );
};

export default CarouselProducts;
