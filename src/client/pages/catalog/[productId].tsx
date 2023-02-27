import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AppLayout from '../../components/functional/app-layout';
import BackButton from '../../components/common/back-button';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import useSWRImmutable from 'swr/immutable';
import { Product } from '../../../backend/model/products.model';
import ProductDetailsImages from '../../components/product-details-images';
import AppTag from '../../components/common/app-tag';
import useCalculateDiscount from '../../hooks/use-calculate-discount';
import AppRange from '../../components/input/app-range';
import AppBaseButton from '../../components/common/app-base-button';
import useLastVisitedProducts from '../../hooks/use-last-visited-products';
import { MouseEvent } from 'react';
import CarouselProducts from 'src/client/components/carousel-products';
import useFetcher from '../../hooks/use-fetcher';
import { AuthenticationContext } from '../../context/authenticated.context';
import { SUPER_USER_ROLE } from '../../../backend/app/constants';

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

const CatalogSlug = (props: { productId: string; children?: ReactNode }) => {
  const fetcher = useFetcher();
  const { data: product } = useSWRImmutable<Product>(
    `v1/products/${props.productId}`,
    fetcher,
  );
  const discountPrice = useCalculateDiscount(product);
  const [, addLastVisited, lastVisitedProducts] = useLastVisitedProducts();
  const router = useRouter();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number | undefined>();
  const { user } = useContext(AuthenticationContext);

  const isAdmin = useMemo(
    () => user && user.role.name === SUPER_USER_ROLE.name,
    [user],
  );

  useEffect(() => {
    if (product && product.quantity) {
      setQuantity(1);
    }
    if (product && product.id) {
      addLastVisited(product.id);
    }
  }, [addLastVisited, product]);

  const onChangeRange = (range: number | [number, number]) => {
    setQuantity(Array.isArray(range) ? range[0] : range);
  };

  const onOtherProductClick = (e: MouseEvent, pr: Product) => {
    router.push(`/catalog/${pr.id}`);
  };

  if (!product) {
    return <></>;
  }
  return (
    <Box px={8}>
      <BackButton goBack={router.back} text={t('Utils.GoBack')} />
      <Box display={'flex'} justifyContent={'space-between'} mt={'2rem'}>
        <Box flexBasis={'60%'} paddingRight={'5rem'}>
          <ProductDetailsImages images={product.images} />
          <Typography
            variant={'h3'}
            fontWeight={'800'}
            marginTop={'2rem'}
            marginBottom={'1rem'}
          >
            {t('ProductDetails.LastVisited')}
          </Typography>
          <CarouselProducts
            products={lastVisitedProducts}
            onClick={(e, p) => onOtherProductClick(e, p)}
            emptyText={t('ProductDetails.NoViews')}
          />
        </Box>
        <Box
          flexBasis={'40%'}
          sx={{
            borderLeft: '1px solid',
            borderColor: 'grey.500',
            paddingLeft: '5rem',
          }}
        >
          <Typography variant={'h3'} fontWeight={'800'}>
            {product.name}
          </Typography>
          <Typography
            variant={'h5'}
            fontWeight={'800'}
            sx={{
              marginBottom: '1rem',
              color: 'grey.200',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in',
              '&:hover': {
                color: 'common.white',
              },
            }}
            onClick={() =>
              router.push(`/catalog?groupId=${product.group.uuid}`)
            }
          >
            {product.group.name}
          </Typography>
          {product.tags && (
            <Box display={'flex'}>
              <Typography
                variant={'subtitle1'}
                fontWeight={'800'}
                sx={{ marginRight: '1rem' }}
              >
                {t('ProductDetails.Tags')}
              </Typography>
              {product.tags.map((tag, index) => (
                <AppTag
                  key={index}
                  tag={tag}
                  index={index}
                  sx={{ marginRight: '1rem' }}
                />
              ))}
            </Box>
          )}
          {product.description && (
            <Typography
              marginTop={'2rem'}
              variant={'subtitle1'}
              fontWeight={'800'}
            >
              {product.description}
            </Typography>
          )}
          <Typography marginTop={'2rem'} variant={'h4'} fontWeight={'800'}>
            {t('ProductDetails.Price')}
          </Typography>
          <Typography variant={'h1'} fontWeight={'800'}>
            {discountPrice} p.
          </Typography>
          {discountPrice !== product.price && (
            <Typography
              variant={'h2'}
              fontWeight={'800'}
              color={'text.secondary'}
            >
              {product.price} p.
            </Typography>
          )}
          {product.quantity > 0 && quantity ? (
            <>
              <Typography marginTop={'2rem'} variant={'h4'} fontWeight={'800'}>
                {t('ProductDetails.Quantity')}
              </Typography>
              <Box>
                <AppRange
                  range={quantity}
                  max={product.quantity}
                  min={1}
                  minDistance={1}
                  step={1}
                  changeRange={onChangeRange}
                  displayLabel={'auto'}
                />
                <Typography variant={'h3'} fontWeight={'800'}>
                  {quantity} {product.measureName}
                </Typography>
              </Box>
            </>
          ) : (
            <Typography variant={'h3'} fontWeight={'800'}>
              {t('ProductDetails.NotAvailable')}
            </Typography>
          )}
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            marginY={'2rem'}
          >
            <AppBaseButton
              variant={'outlined'}
              color={'secondary'}
              type={'button'}
              sx={{
                borderColor: 'common.black',
                textTransform: 'initial',
                maxWidth: '300px',
              }}
            >
              {t('ProductDetails.AddToBin')}
            </AppBaseButton>
            {isAdmin && (
              <AppBaseButton
                variant={'contained'}
                color={'primary'}
                type={'button'}
                sx={{
                  marginTop: '2rem',
                }}
                onClick={() =>
                  router.push(
                    `/admin/products/${product.group.uuid}/${product.id}`,
                  )
                }
              >
                {t('ProductDetails.Edit')}
              </AppBaseButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

CatalogSlug.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default CatalogSlug;
