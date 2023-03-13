import { useEffect, useState } from 'react';
import { FetchProducts, FetchResValidations } from '../interfaces/fetches';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { isEqual } from 'lodash';
import { ProductGroup } from '../../backend/model/product-groups.model';
import { Product } from 'src/backend/model/products.model';

const useGetProducts = (
  routeName: (page: number, query: string) => string,
): FetchResValidations & FetchProducts => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<{
    items: Product[];
    meta: { nextPage: string | number } | null;
  }>({ items: [], meta: null });
  const [error, setErrors] = useState(false);
  const router = useRouter();
  const [currentQuery, setCurrentQuery] = useState<ParsedUrlQuery>();
  const [productsGroup, setProductsGroup] = useState<ProductGroup>();

  useEffect(() => {
    if (router.query && !isEqual(currentQuery, router.query)) {
      setCurrentQuery(router.query);
      getProducts(window.location.search.replace('?', ''));
      const url = new URLSearchParams(window.location.search);
      if (url.has('groupId')) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getGroup(url.get('groupId')!);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const getGroup = async (id: string) => {
    const group = await (await fetch(`/v1/product-groups/${id}`)).json();
    setProductsGroup(group);
  };

  const getPageProducts = async () => {
    if (!products.meta || products.meta.nextPage) {
      try {
        const pageProducts = await (
          await fetch(
            routeName(currentPage, window.location.search.replace('?', '')),
          )
        ).json();
        setProducts({
          items: [...products.items, ...pageProducts.items],
          meta: pageProducts.meta,
        });
      } catch (e) {
        setErrors(true);
      }
      setCurrentPage(currentPage + 1);
    }
  };

  const getProducts = async (query: string) => {
    try {
      setCurrentPage(1);
      const pageProducts = await (await fetch(routeName(1, query))).json();
      setProducts({
        items: pageProducts.items,
        meta: pageProducts.meta,
      });
    } catch (e) {
      setErrors(true);
    }
  };

  useEffect(() => {
    getPageProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    products: error || !products ? [] : products.items,
    group: productsGroup,
    isError: error,
    isLoading: !error && !products,
    getMoreProducts: getPageProducts,
  };
};

export default useGetProducts;
