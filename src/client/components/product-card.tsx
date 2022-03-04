import { Product } from '../../backend/model/products.model';
import {
  Box,
  Card,
  CardContent,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useMemo } from 'react';
import add from 'date-fns/add';
import { parseISO, compareDesc } from 'date-fns';
import { MouseEvent } from 'react';
import ProductMediaCard from './product-media-card';
import { useTranslation } from 'react-i18next';
import { lighten } from '@mui/system/colorManipulator';
import useCalculateDiscount from '../hooks/use-calculate-discount';

const TypographyLineEllipsis = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  cursor: 'pointer',
}));

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
    <Card
      sx={{
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
        <TypographyLineEllipsis
          gutterBottom
          variant={'h5'}
          onClick={(e) => onCardTitleClick(e, product)}
        >
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
