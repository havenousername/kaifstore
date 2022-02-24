import { NextPageWithLayout } from '../interfaces/pages-layout';
import React, { ReactElement, useEffect, useRef } from 'react';
import AppLayout from '../components/app-layout';
import { Box, Typography } from '@mui/material';
import ProductsCollection from '../components/products-collection';
import useGetProducts from '../hooks/use-get-products';
import useDetectBottomScroll from '../hooks/use-detect-bottom-scroll';

const Catalog: NextPageWithLayout = () => {
  const { products, getMoreProducts } = useGetProducts();
  const productsCollectionRef = useRef<HTMLDivElement>();
  const [isBottom] = useDetectBottomScroll(productsCollectionRef);

  useEffect(() => {
    if (isBottom) {
      getMoreProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);

  return (
    <Box
      sx={{
        padding: '1rem 8rem 4rem',
      }}
    >
      <Typography
        variant={'h4'}
        component={'h4'}
        padding={(theme) => theme.spacing(2, 3)}
        fontWeight={600}
      >
        {'Catalog'}
      </Typography>
      <ProductsCollection products={products} ref={productsCollectionRef} />
    </Box>
  );
};

Catalog.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Catalog;
