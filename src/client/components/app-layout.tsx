import { ChangeEvent, ReactNode, useState } from 'react';
import Navbar from './navbar';
import { Box } from '@mui/material';
import HeaderSearchbar from './header-searchbar';
import { useTranslation } from 'react-i18next';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>(null);
  const { t } = useTranslation();

  const changeSearchValue = (
    e: (ChangeEvent & { target: HTMLInputElement }) | string,
  ) => {
    if (typeof e === 'string') {
      setSearchValue(e);
    } else {
      setSearchValue(e.target.value);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component={'main'} sx={{ width: '100%' }}>
          <HeaderSearchbar
            searchBar={{
              value: searchValue,
              placeholder: t('Searchbar.Placeholder'),
              onChange: changeSearchValue,
            }}
          />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
