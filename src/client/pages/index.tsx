import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Product } from '../../backend/model/products.model';
import ProductCard from '../components/product-card';

export async function getServerSideProps(context) {
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = context.req
    ? `${protocol}://${context.req.headers.host}`
    : '';

  const productsRes = await fetch(baseUrl + `/v1/products`);
  const productsData = await productsRes.json();
  return {
    props: {
      products: productsData,
      baseUrl,
    },
  };
}

const Index = (props: { products: Product[]; baseUrl: string }) => {
  const { t } = useTranslation();
  const [mockProducts] = useState<Product[]>(
    Array(20).fill(props.products).flat(),
  );

  return (
    <Box
      sx={{
        padding: '4rem 8rem',
      }}
    >
      <Typography variant={'h4'} component={'h4'} paddingX={'2rem'}>
        {t('IndexPage.Hot')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: '2rem',
        }}
      >
        {mockProducts.map((product, key) => {
          return <ProductCard key={key} product={product} />;
        })}
      </Box>
    </Box>
  );
};

export default Index;
