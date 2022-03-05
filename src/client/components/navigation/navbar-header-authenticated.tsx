import { Box, Typography, Avatar } from '@mui/material';
import { User } from '../../../backend/model/users.model';
import { ReactComponent as DefaultUserIcon } from '../../assets/icons/default-user.svg';
import AppBaseButton from '../common/app-base-button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavbarHeaderAuthenticated = ({
  user,
  checkAuthentication,
}: {
  user: User;
  checkAuthentication: () => Promise<void>;
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const onLogout = async () => {
    await fetch('v1/auth/logout', {
      method: 'POST',
    });
    await checkAuthentication();
    await router.push('/login');
  };

  return (
    <Box padding={'0.5rem 1rem'}>
      <Link href={'/settings'}>
        <Box display={'flex'} sx={{ cursor: 'pointer' }}>
          <Box display={'flex'} alignItems={'center'}>
            {!user.photo && <DefaultUserIcon />}
            {user.photo && <Avatar alt={user.firstName} src={user.photo} />}
          </Box>
          <Box marginLeft={2}>
            <Typography variant={'h5'} component={'h5'}>
              {user.firstName + ' ' + user.lastName}
            </Typography>
            <Typography variant={'h6'} fontWeight={'bold'}>
              {user.role.name}
            </Typography>
          </Box>
        </Box>
      </Link>
      <AppBaseButton
        variant={'outlined'}
        color={'secondary'}
        type={'button'}
        sx={{
          paddingY: '0.2rem',
          marginTop: '1rem',
        }}
        onClick={onLogout}
      >
        {t('Navbar.Logout')}
      </AppBaseButton>
    </Box>
  );
};

export default NavbarHeaderAuthenticated;
