import { ReactNode, SyntheticEvent, useState } from 'react';
import Navbar from '../navigation/navbar';
import { Box } from '@mui/material';
import HeaderSearchbar from '../navigation/header-searchbar';
import { useTranslation } from 'react-i18next';

const AppLayout = ({
  children,
  hasHeader = true,
}: {
  children: ReactNode;
  hasHeader?: boolean;
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { t } = useTranslation();

  const changeSearchValue = (e: string | SyntheticEvent<Element, Event>) => {
    if (typeof e === 'string') {
      setSearchValue(e);
    } else {
      setSearchValue((e.target as unknown as { value: string }).value);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box component={'main'} sx={{ width: '100%' }}>
          {hasHeader && (
            <HeaderSearchbar
              searchBar={{
                value: searchValue,
                placeholder: t('Searchbar.Placeholder'),
                onChange: changeSearchValue,
              }}
            />
          )}
          {children}
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
