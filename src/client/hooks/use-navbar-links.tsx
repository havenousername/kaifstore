import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { LinkItem } from '../interfaces/navbars';
import { ReactComponent as MainPage } from '/assets/icons/main.svg';
import { ReactComponent as CatalogPage } from '../assets/icons/catalog.svg';
import { ReactComponent as ProductPage } from '../assets/icons/products.svg';
import { useRouter } from 'next/router';

const useNavbarLinks = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [navBars, setNavbars] = useState<Array<LinkItem>>([
    {
      name: t('Pages.Index'),
      path: '/',
      current: false,
      icon: <MainPage />,
    },
    {
      name: t('Pages.Catalog'),
      path: '/catalog',
      current: false,
      icon: <CatalogPage />,
      subPaths: ['/catalog/[productId]'],
    },
  ]);

  const [adminNavbars, setAdminNavbars] = useState<Array<LinkItem>>([
    {
      name: t('Pages.Products'),
      path: '/admin/products',
      current: false,
      icon: <ProductPage />,
      subPaths: ['/admin/products/[productId]'],
    },
  ]);

  useEffect(() => {
    const applyCurrent = (prevState: LinkItem[]) =>
      prevState.map((state) => ({
        ...state,
        current:
          router.route === state.path ||
          (!!state.subPaths && state.subPaths.includes(router.route)),
      }));
    setNavbars((prevState) => applyCurrent(prevState));
    setAdminNavbars((prev) => applyCurrent(prev));
  }, [router.route]);

  return [navBars, adminNavbars];
};

export default useNavbarLinks;
