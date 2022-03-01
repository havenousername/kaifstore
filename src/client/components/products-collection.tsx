import { Product } from '../../backend/model/products.model';
import ProductCard from './product-card';
import { Box } from '@mui/material';
import React, { forwardRef } from 'react';
import { MouseEvent } from 'react';
import { useRouter } from 'next/router';

const ProductsCollection = forwardRef(
  ({ products }: { products: Product[] }, ref) => {
    const router = useRouter();
    const onProductClick = (e: MouseEvent, product: Product) => {
      router.push(`/catalog/${product.id}`);
    };

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
          return (
            <ProductCard
              key={key}
              product={product}
              onCardTitleClick={onProductClick}
            />
          );
        })}
      </Box>
    );
  },
);

export default ProductsCollection;
