import React, { ReactElement, ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Product } from '../../backend/model/products.model';
import { NextPageWithLayout } from '../interfaces/pages-layout';
import AppLayout from '../components/app-layout';
import LoginButton from '../components/login-button';
import { AuthenticationContext } from '../context/authenticated.context';
import ProductsCollection from '../components/products-collection';

export async function getServerSideProps(context) {
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = context.req
    ? `${protocol}://${context.req.headers.host}`
    : '';

  const productsRes = await fetch(baseUrl + `/v1/products/latest?limit=6`);
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
  const { authenticated } = useContext(AuthenticationContext);
  return (
    <>
      <Box
        sx={{
          padding: '1rem 8rem 4rem',
        }}
      >
        <Typography
          variant={'h4'}
          component={'h4'}
          paddingX={'2rem'}
          fontWeight={600}
        >
          {t('IndexPage.OurProposals')}
        </Typography>
        <Box
          component={'section'}
          sx={{
            display: 'flex',
            marginBottom: '4rem',
            marginTop: '2rem',
          }}
        >
          <Typography variant={'h1'} component={'h1'} maxWidth={'14ch'}>
            {t('IndexPage.Callout')}
          </Typography>
          <Box marginTop={'0.5rem'}>
            <Typography
              variant={'subtitle1'}
              component={'p'}
              maxWidth={'55ch'}
              sx={{ marginBottom: '1.5rem' }}
            >
              {t('IndexPage.CalloutText')}
            </Typography>
            {!authenticated && <LoginButton />}
          </Box>
        </Box>
        <Typography
          variant={'h4'}
          component={'h4'}
          paddingX={'2rem'}
          fontWeight={600}
        >
          {t('IndexPage.Hot')}
        </Typography>
        <ProductsCollection products={products} />
      </Box>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Index;
