import { Product } from '../../backend/model/products.model';
import { Box, Card, CardContent, styled, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import add from 'date-fns/add';
import { parseISO, compareDesc } from 'date-fns';
import * as React from 'react';
import ProductMediaCard from './product-media-card';
import { useTranslation } from 'react-i18next';

const TypographyLineEllipsis = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

const ProductCard = ({ product }: { product: Product }) => {
  const [discountPercent] = useState(
    product.discounts && product.discounts.length > 1
      ? product.discounts
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .map((i) => i.amount as number)
          .reduce((a, b) => a + b)
      : 0,
  );
  const [discountPrice, setDiscountPrice] = useState(product.price);

  const calculatePrice = useCallback(() => {
    const newPrice = product.price - (product.price * discountPercent) / 100;
    setDiscountPrice(newPrice);
  }, [discountPercent, product.price]);

  useEffect(() => {
    calculatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();

  const isNew = useMemo(
    () =>
      compareDesc(add(parseISO(product.createdAt), { days: 10 }), new Date()) <
      1,
    [product.createdAt],
  );

  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: '1.8rem 1.8rem 0',
        backgroundColor: 'grey.700',
        marginBottom: '30px',
        height: 450,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ProductMediaCard
        newText={t('IndexPage.NewIconText')}
        image={product.images[0]}
        isNew={isNew}
        hasDiscount={false}
        isFavourite={false}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <TypographyLineEllipsis gutterBottom variant={'h5'}>
          {product.name}
        </TypographyLineEllipsis>
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;
