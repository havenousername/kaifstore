import { NextPageWithLayout } from '../interfaces/pages-layout';
import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import AppLayout from '../components/functional/app-layout';
import { Box, Typography } from '@mui/material';
import ProductsCollection from '../components/products-collection';
import useGetProducts from '../hooks/use-get-products';
import useDetectBottomScroll from '../hooks/use-detect-bottom-scroll';
import { useTranslation } from 'react-i18next';

const Catalog: NextPageWithLayout = () => {
  const catalogPath = useCallback(
    (currentPage: number, query = '') =>
      `/v1/products?page=${currentPage}&desc=createdAt&${query}`,
    [],
  );
  const { products, getMoreProducts, group } = useGetProducts(catalogPath);
  const productsCollectionRef = useRef<HTMLDivElement>();
  const [isBottom] = useDetectBottomScroll(productsCollectionRef);
  const { t } = useTranslation();

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
        {t('Catalog.Catalog')} / {group && group.name}
      </Typography>
      {products && (
        <ProductsCollection products={products} ref={productsCollectionRef} />
      )}
    </Box>
  );
};

Catalog.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Catalog;
