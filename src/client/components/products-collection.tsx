import { Product } from '../../backend/model/products.model';
import ProductCard from './product-card';
import { Box, Grid } from '@mui/material';
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
          marginTop: '2rem',
        }}
      >
        <Grid container spacing={2}>
          {products &&
            products.map((product, key) => {
              return (
                <Grid item xs={10} lg={6} xl={4}>
                  <ProductCard
                    key={key}
                    product={product}
                    onCardTitleClick={onProductClick}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    );
  },
);

export default ProductsCollection;
