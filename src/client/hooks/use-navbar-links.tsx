import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { LinkItem } from '../interfaces/navbars';
import { ReactComponent as MainPage } from '/assets/icons/main.svg';
import { ReactComponent as CatalogPage } from '../assets/icons/catalog.svg';
import { useRouter } from 'next/router';

const useNavbarLinks = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [navBars, setNavbars] = useState<Array<LinkItem>>([
    {
      name: t('Pages.Index'),
      path: '/',
      current: router.route === '/',
      icon: <MainPage />,
    },
    {
      name: t('Pages.Catalog'),
      path: '/catalog',
      current: router.route === '/catalog',
      icon: <CatalogPage />,
    },
  ]);

  useEffect(() => {
    setNavbars((prev) =>
      prev.map((path) => ({ ...path, current: router.route === path.path })),
    );
  }, [router.route]);

  return [navBars];
};

export default useNavbarLinks;
