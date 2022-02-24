import { Product } from '../../backend/model/products.model';
import ProductCard from './product-card';
import { Box } from '@mui/material';
import React, { forwardRef } from 'react';

const ProductsCollection = forwardRef(
  ({ products }: { products: Product[] }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: '2rem',
        }}
      >
        {products.map((product, key) => {
          return <ProductCard key={key} product={product} />;
        })}
      </Box>
    );
  },
);

export default ProductsCollection;
