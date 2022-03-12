import { Product } from '../../backend/model/products.model';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import add from 'date-fns/add';
import { parseISO, compareDesc } from 'date-fns';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { lighten } from '@mui/system/colorManipulator';
import useCalculateDiscount from '../hooks/use-calculate-discount';
import ProductCardSkeleton from './product-card-skeleton';

const ProductCard = ({
  product,
  onCardTitleClick,
}: {
  product: Product;
  onCardTitleClick?: (e: MouseEvent, product: Product) => void;
}) => {
  const discountPrice = useCalculateDiscount(product);
  const { t } = useTranslation();

  const isNew = useMemo(
    () =>
      compareDesc(add(parseISO(product.createdAt), { days: 10 }), new Date()) <
      1,
    [product.createdAt],
  );

  const theme = useTheme();

  return (
    <ProductCardSkeleton
      onCardTitleClick={onCardTitleClick}
      sxRoot={{
        maxWidth: 345,
        padding: '1.8rem 1.8rem 0',
        backgroundColor: 'grey.700',
        marginBottom: '30px',
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in',
        '&:hover': {
          backgroundColor: lighten(theme.palette.grey[700], 0.05),
        },
      }}
      newIcon={{
        newText: t('IndexPage.NewIconText'),
        isNew,
      }}
      footerComponent={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Typography variant={'h4'} component={'span'}>
            {discountPrice.toFixed(2)} p.
          </Typography>
          {Math.round(discountPrice) !== product.price && (
            <Typography
              variant={'h5'}
              component={'span'}
              sx={{
                color: 'text.secondary',
                lineHeight: 1.4,
                marginLeft: '1rem',
              }}
            >
              {product.price.toFixed(2)} p.
            </Typography>
          )}
        </Box>
      }
      product={product}
    />
  );
};

export default ProductCard;
