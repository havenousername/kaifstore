import { NextPageWithLayout } from '../interfaces/pages-layout';
import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import AppLayout from '../components/app-layout';
import { Box, Typography } from '@mui/material';
import ProductsCollection from '../components/products-collection';
import useGetProducts from '../hooks/use-get-products';
import useDetectBottomScroll from '../hooks/use-detect-bottom-scroll';
import { useRouter } from 'next/router';

const Catalog: NextPageWithLayout = () => {
  const catalogPath = useCallback(
    (currentPage: number) => `/v1/products/latest?page=${currentPage}`,
    [],
  );
  const { products, getMoreProducts } = useGetProducts(catalogPath);
  const productsCollectionRef = useRef<HTMLDivElement>();
  const [isBottom] = useDetectBottomScroll(productsCollectionRef);
  const router = useRouter();

  useEffect(() => {
    if (isBottom) {
      getMoreProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);

  useEffect(() => {
    console.log(router.query);
  }, [router.query]);

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
