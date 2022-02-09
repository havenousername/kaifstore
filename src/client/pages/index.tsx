import React, { ReactElement, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Product } from '../../backend/model/products.model';
import ProductCard from '../components/product-card';
import { NextPageWithLayout } from '../interfaces/pages-layout';
import AppLayout from '../components/app-layout';

export async function getServerSideProps(context) {
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = context.req
    ? `${protocol}://${context.req.headers.host}`
    : '';

  const productsRes = await fetch(baseUrl + `/v1/products`);
  const productsData = await productsRes.json();
  return {
    props: {
      products: productsData.items,
      baseUrl,
      meta: productsData.meta,
    },
  };
}

const Index: NextPageWithLayout = (props: {
  products: Product[];
  baseUrl: string;
  children: ReactNode;
}) => {
  const { t } = useTranslation();
  const [products] = useState<Product[]>(props.products);

  return (
    <>
      <Box
        sx={{
          padding: '4rem 8rem',
        }}
      >
        <Typography variant={'h5'} component={'h4'} paddingX={'2rem'}>
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
          {products.map((product, key) => {
            return <ProductCard key={key} product={product} />;
          })}
        </Box>
      </Box>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Index;
