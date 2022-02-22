import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LoginButton from './login-button';

const NavbarHeaderUnauthenticated = () => {
  const { t } = useTranslation();
  return (
    <Box padding={'2rem 1rem'}>
      <Typography variant={'h4'} component={'h3'}>
        {t('Navbar.UnauthText')}
      </Typography>
      <LoginButton
        sx={{
          marginTop: '1rem',
          maxWidth: '10rem',
          textTransform: 'capitalize',
          backgroundColor: 'primary.light',
          paddingY: '3px',
        }}
      />
    </Box>
  );
};

export default NavbarHeaderUnauthenticated;
