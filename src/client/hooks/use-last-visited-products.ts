import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../backend/model/products.model';

const useLastVisitedProducts = (): [
  number[],
  (id: number) => void,
  Product[],
  string,
] => {
  const [lastVisitedIds, setLastVisitedIds] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    try {
      const ids = JSON.parse(
        window.localStorage.getItem('lastVisitedProducts'),
      ) as number[];
      setLastVisitedIds(ids ?? []);
    } catch (e) {
      console.log('No last visited products');
    }
  }, []);

  useEffect(() => {
    addProducts();
    // console.log(products);
  }, []);

  const addToLastVisited = useCallback((id: number) => {
    setLastVisitedIds((prevState) => {
      if (prevState.includes(id)) {
        prevState = prevState.filter((i) => i !== id);
      }

      if (prevState.length > 10) {
        prevState.shift();
      }
      prevState.push(id);
      console.log(prevState);
      window.localStorage.setItem(
        'lastVisitedProducts',
        JSON.stringify(prevState),
      );
      return prevState;
    });
  }, []);

  const addProducts = async () => {
    try {
      const pageProducts = await (
        await fetch(
          `/v1/products/ids/${window.localStorage.getItem(
            'lastVisitedProducts',
          )}`,
        )
      ).json();
      setProducts(pageProducts);
    } catch (e) {
      setErrors(e);
    }
  };

  return [lastVisitedIds, addToLastVisited, products, errors];
};

export default useLastVisitedProducts;
