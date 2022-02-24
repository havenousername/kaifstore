import { Box, Typography } from '@mui/material';
import AppSearchbar from './app-searchbar';
import { SearchbarProps } from '../interfaces/searchbar';
import { useTranslation } from 'react-i18next';

const HeaderSearchbar = ({ searchBar }: { searchBar: SearchbarProps }) => {
  const { t } = useTranslation();
  return (
    <Box
      component={'header'}
      sx={{
        padding: '2rem 8rem',
      }}
    >
      <Typography
        variant={'h4'}
        component={'h4'}
        padding={(theme) => theme.spacing(2, 3)}
        fontWeight={600}
      >
        {t('Searchbar.Search')}
      </Typography>
      <AppSearchbar {...searchBar} />
    </Box>
  );
};

export default HeaderSearchbar;
