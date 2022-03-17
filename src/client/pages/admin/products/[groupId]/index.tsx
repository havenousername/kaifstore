import { NextPageWithLayout } from '../../../../interfaces/pages-layout';
import { Box, Link, Typography } from '@mui/material';
import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import AppLayout from '../../../../components/functional/app-layout';
import useDetectBottomScroll from '../../../../hooks/use-detect-bottom-scroll';
import ProductsCollection from '../../../../components/products-collection';
import useGetProducts from '../../../../hooks/use-get-products';
import AdminTheme from '../../../../components/functional/admin-theme';
import { useTranslation } from 'react-i18next';
import AppBaseButton from '../../../../components/common/app-base-button';
import BackButton from '../../../../components/common/back-button';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable';
import standardFetcher from '../../../../api/standard-fetcher';
import { ProductGroup } from '../../../../../backend/model/product-groups.model';

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export function getStaticProps(context) {
  return {
    props: {
      groupId: context.params.groupId,
    },
  };
}

const Index: NextPageWithLayout = ({
  groupId,
}: {
  groupId: string;
  children: ReactNode;
}) => {
  const catalogPath = useCallback(
    (currentPage: number, query = '') =>
      `/v1/products?groupId=${groupId}&page=${currentPage}&desc=createdAt&${query}`,
    [groupId],
  );
  const { data: group } = useSWRImmutable<ProductGroup>(
    `/v1/product-groups/${groupId}`,
    standardFetcher,
  );
  const { products, getMoreProducts } = useGetProducts(catalogPath);
  const productsCollectionRef = useRef<HTMLDivElement>();
  const [isBottom] = useDetectBottomScroll(productsCollectionRef);
  const { t } = useTranslation();
  const router = useRouter();

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
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <Box>
          <BackButton
            goBack={router.back}
            text={t('Utils.GoBack')}
            sx={{ my: '1.5rem' }}
          />
          <Typography
            variant={'h4'}
            component={'h4'}
            padding={(theme) => theme.spacing(2, 3)}
            fontWeight={600}
          >
            {t('Products.Products')} / {group && group.name}
          </Typography>
        </Box>
        <Link
          href={'/admin/products/create'}
          sx={{
            marginTop: '1rem',
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          <AppBaseButton
            variant={'contained'}
            color={'primary'}
            sx={{
              fontWeight: 700,
              maxHeight: '2.75rem',
            }}
          >
            {t('Products.CreateNewProduct')}
          </AppBaseButton>
        </Link>
      </Box>
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

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminTheme>
      <AppLayout hasHeader={false}>{page}</AppLayout>{' '}
    </AdminTheme>
  );
};

export default Index;
