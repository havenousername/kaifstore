import { Product } from '../../backend/model/products.model';
import ProductCard from './product-card';
import { Box, Grid } from '@mui/material';
import React, { forwardRef } from 'react';
import { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import ProductCardAdmin from './product-card-admin';
import { useTranslation } from 'react-i18next';

const ProductsCollection = forwardRef(
  (
    { products, isAdmin = false }: { products: Product[]; isAdmin?: boolean },
    ref,
  ) => {
    const router = useRouter();
    const { t } = useTranslation();
    const onProductClick = (e: MouseEvent, product: Product) => {
      router.push(`/catalog/${product.id}`);
    };

    const onProductEdit = (e: MouseEvent, product: Product) => {
      router.push(`/admin/products/${product.groupId}/${product.id}`);
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
                <Grid item xs={10} lg={6} xl={4} key={key}>
                  {!isAdmin ? (
                    <ProductCard
                      product={product}
                      onCardTitleClick={onProductClick}
                    />
                  ) : (
                    <ProductCardAdmin
                      editText={t('Products.Edit')}
                      product={product}
                      onCardTitleClick={onProductClick}
                      onEdit={onProductEdit}
                    />
                  )}
                </Grid>
              );
            })}
        </Grid>
      </Box>
    );
  },
);

export default ProductsCollection;
