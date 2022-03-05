import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import AppBaseButton from './common/app-base-button';
import { useTranslation } from 'react-i18next';
import { SxProps } from '@mui/system';

const LoginButton = ({ sx }: { sx?: SxProps }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const onNavigateLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <>
      <AppBaseButton
        sx={sx}
        variant={'contained'}
        color={'primary'}
        type={'button'}
        onClick={onNavigateLogin}
      >
        {t('LoginPage.Enter')}
      </AppBaseButton>
    </>
  );
};

export default LoginButton;
