import { NextPageWithLayout } from '../../interfaces/pages-layout';
import { Box, Typography } from '@mui/material';
import React, { ReactElement, useCallback, useEffect, useRef } from 'react';
import AppLayout from '../../components/functional/app-layout';
import useDetectBottomScroll from '../../hooks/use-detect-bottom-scroll';
import ProductsCollection from '../../components/products-collection';
import useGetProducts from '../../hooks/use-get-products';
import AdminTheme from '../../components/functional/admin-theme';
import { useTranslation } from 'react-i18next';

const Catalog: NextPageWithLayout = () => {
  const catalogPath = useCallback(
    (currentPage: number, query = '') =>
      `/v1/products?page=${currentPage}&desc=createdAt&${query}`,
    [],
  );
  const { products, getMoreProducts } = useGetProducts(catalogPath);
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
        {t('Products.Products')}
      </Typography>
      {products && (
        <ProductsCollection
          isAdmin
          products={products}
          ref={productsCollectionRef}
        />
      )}
    </Box>
  );
};

Catalog.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminTheme>
      <AppLayout hasHeader={false}>{page}</AppLayout>{' '}
    </AdminTheme>
  );
};

export default Catalog;
