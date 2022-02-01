import { Product } from '../../backend/model/products.model';
import { Card, CardContent, CardMedia } from '@mui/material';
import hookah from '../assets/hookah.jpg';
import { Box, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import kaifStoreColors from '../theme/kaifstoreColors';

const ProductCard = ({ product }: { product: Product }) => {
  const [discountPercent] = useState(
    product.discounts
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .map((i) => i.amount as number)
      .reduce((a, b) => a + b),
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
  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: '1.8rem',
        backgroundColor: 'grey.700',
        marginBottom: '30px',
      }}
    >
      <CardMedia
        component={'img'}
        height={300}
        image={hookah.src}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant={'h6'} component={'h5'}>
          {product.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Typography variant={'h5'} component={'span'}>
            {discountPrice.toFixed(2)} p.
          </Typography>
          <Typography
            variant={'h6'}
            component={'span'}
            style={{
              color: kaifStoreColors.grayText,
              lineHeight: 1.4,
              marginLeft: '1rem',
            }}
          >
            {product.price.toFixed(2)} p.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
