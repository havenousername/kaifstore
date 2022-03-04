import { NextPageWithLayout } from '../../interfaces/pages-layout';
import React, { ReactElement, ReactNode } from 'react';
import AppLayout from '../../components/app-layout';
import BackButton from '../../components/back-button';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import useSWRImmutable from 'swr/immutable';
import fetcher from '../../api/root-fetcher';
import { Product } from '../../../backend/model/products.model';
import ProductDetailsImages from '../../components/product-details-images';

export function getStaticProps(context) {
  return {
    props: {
      productId: context.params.productId,
    },
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

const CatalogSlug: NextPageWithLayout = (props: {
  productId: string;
  children?: ReactNode;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: product } = useSWRImmutable<Product>(
    `v1/products/${props.productId}`,
    fetcher,
  );
  const router = useRouter();
  const { t } = useTranslation();

  if (!product) {
    return <></>;
  }
  return (
    <Box px={8}>
      <BackButton goBack={router.back} text={t('Utils.GoBack')} />
      <Box maxWidth={'500px'}>
        <ProductDetailsImages images={product.images} />
      </Box>
    </Box>
  );
};

CatalogSlug.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default CatalogSlug;
