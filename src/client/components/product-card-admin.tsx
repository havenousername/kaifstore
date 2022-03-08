import { Product } from '../../backend/model/products.model';
import { MouseEvent } from 'react';
import ProductCardSkeleton from './product-card-skeleton';
import { lighten } from '@mui/system/colorManipulator';
import { Box, Typography, useTheme } from '@mui/material';
import AppBaseButton from './common/app-base-button';

const ProductCardAdmin = ({
  product,
  onCardTitleClick,
  onEdit,
  editText,
}: {
  product: Product;
  onCardTitleClick?: (e: MouseEvent, product: Product) => void;
  onEdit?: (e: MouseEvent, product: Product) => void;
  editText: string;
}) => {
  const theme = useTheme();

  return (
    <ProductCardSkeleton
      sxRoot={{
        maxWidth: 400,
        padding: '1.8rem 1.8rem 0',
        backgroundColor: 'grey.600',
        marginBottom: '30px',
        height: 520,
        display: 'flex',
        border: `2px solid ${theme.palette.grey[500]}`,
        flexDirection: 'column',
        transition: 'all 0.2s ease-in',
        '&:hover': {
          backgroundColor: lighten(theme.palette.grey[700], 0.05),
        },
      }}
      footerComponent={
        <Box>
          <Typography
            variant={'h6'}
            fontWeight={800}
            marginY={'1rem'}
            sx={{
              height: '3rem',
            }}
          >
            {product.description.length > 50
              ? product.description.slice(0, 50) + '...'
              : product.description}
          </Typography>
          <AppBaseButton
            variant={'contained'}
            color={'primary'}
            sx={{
              fontWeight: '700',
            }}
            onClick={(e) => onEdit(e, product)}
          >
            {editText}
          </AppBaseButton>
        </Box>
      }
      product={product}
      onCardTitleClick={onCardTitleClick}
      sxCard={{
        justifyContent: 'flex-start',
      }}
    />
  );
};

export default ProductCardAdmin;
