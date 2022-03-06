import ProductMediaCard from './product-media-card';
import { Box, Card, CardContent, styled, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import { MouseEvent, ReactNode } from 'react';
import useGetHttpUrl from '../hooks/use-get-http-url';
import { Product } from '../../backend/model/products.model';

interface NewIcon {
  isNew: boolean;
  newText: string;
}

const TypographyLineEllipsis = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  cursor: 'pointer',
  height: '3.5rem',
}));

const ProductCardSkeleton = ({
  sxRoot,
  newIcon = {
    newText: '',
    isNew: false,
  },
  footerComponent,
  product,
  onCardTitleClick,
  sxCard,
}: {
  sxRoot: SxProps;
  newIcon?: NewIcon;
  footerComponent: ReactNode;
  product: Product;
  onCardTitleClick?: (e: MouseEvent, product: Product) => void;
  sxCard?: SxProps;
}) => {
  const getHttpUrl = useGetHttpUrl();
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginBottom: '30px',
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in',
        ...sxRoot,
      }}
    >
      <ProductMediaCard
        newText={newIcon.newText}
        image={getHttpUrl(product.images[0])}
        isNew={newIcon.isNew}
        hasDiscount={false}
        isFavourite={false}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          ...sxCard,
        }}
      >
        <TypographyLineEllipsis
          gutterBottom
          variant={'h5'}
          onClick={(e) => onCardTitleClick(e, product)}
        >
          {product.name}
        </TypographyLineEllipsis>
        <Box>{footerComponent}</Box>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
