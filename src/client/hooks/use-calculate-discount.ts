import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../backend/model/products.model';

const useCalculateDiscount = (product: Product) => {
  const [discountPrice, setDiscountPrice] = useState(
    product ? product.price : 0,
  );

  const discountPercent = useCallback((product) => {
    return product.discounts && product.discounts.length > 0
      ? product.discounts
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .map((i) => i.amount as number)
          .reduce((a, b) => a + b, 0)
      : 0;
  }, []);

  const calculatePrice = useCallback(() => {
    const newPrice =
      product.price - (product.price * discountPercent(product)) / 100;
    setDiscountPrice(newPrice);
  }, [discountPercent, product]);

  useEffect(() => {
    if (product) {
      calculatePrice();
    }
  }, [calculatePrice, product]);

  return discountPrice;
};

export default useCalculateDiscount;
