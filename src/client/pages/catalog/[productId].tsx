import { NextPageWithLayout } from '../../interfaces/pages-layout';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import AppLayout from '../../components/app-layout';
import BackButton from '../../components/back-button';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import useSWRImmutable from 'swr/immutable';
import fetcher from '../../api/root-fetcher';
import { Product } from '../../../backend/model/products.model';
import ProductDetailsImages from '../../components/product-details-images';
import AppTag from '../../components/app-tag';
import useCalculateDiscount from '../../hooks/use-calculate-discount';
import AppRange from '../../components/app-range';

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
  const discountPrice = useCalculateDiscount(product);
  const router = useRouter();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState<number | undefined>();

  useEffect(() => {
    if (product && product.quantity) {
      setQuantity(1);
    }
  }, [product]);

  const onChangeRange = (range: number) => {
    setQuantity(range);
  };

  if (!product) {
    return <></>;
  }
  return (
    <Box px={8}>
      <BackButton goBack={router.back} text={t('Utils.GoBack')} />
      <Box display={'flex'} justifyContent={'space-between'} mt={'2rem'}>
        <Box flexBasis={'50%'} paddingRight={'5rem'}>
          <ProductDetailsImages images={product.images} />
        </Box>
        <Box
          flexBasis={'50%'}
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
              router.push(`/catalog?groupId=${product.group.groupId}`)
            }
          >
            {product.group.name}
          </Typography>
          {product.characteristics && (
            <Box display={'flex'}>
              <Typography
                variant={'subtitle1'}
                fontWeight={'800'}
                sx={{ marginRight: '1rem' }}
              >
                {t('ProductDetails.Tags')}
              </Typography>
              {product.characteristics.map((tag, index) => (
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
          {product.quantity > 0 && quantity && (
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
          )}
        </Box>
      </Box>
    </Box>
  );
};

CatalogSlug.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default CatalogSlug;
