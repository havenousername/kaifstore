import { useEffect, useState } from 'react';
import { FetchProducts, FetchResValidations } from '../interfaces/fetches';

const useGetProducts = (
  routeName: (page: number) => string,
): FetchResValidations & FetchProducts => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState({ items: [], meta: null });
  const [error, setErrors] = useState(null);

  const getPageProducts = async () => {
    if (!products.meta || products.meta.nextPage) {
      try {
        const pageProducts = await (await fetch(routeName(currentPage))).json();
        setProducts({
          items: [...pageProducts.items, ...products.items],
          meta: pageProducts.meta,
        });
      } catch (e) {
        setErrors(e);
      }
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    getPageProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    products: error || !products ? [] : products.items,
    isError: error,
    isLoading: !error && !products,
    getMoreProducts: getPageProducts,
  };
};

export default useGetProducts;
