import React, { FunctionComponent, useState } from 'react';
import background from '../assets/background-register.png';
import { Typography } from '@mui/material';
import BoxedContainer from '../components/boxed-container';
import { useTranslation } from 'react-i18next';
import AppIcon from '../components/common/app-icon';
import { ReactComponent as EmailIcon } from '../assets/icons/at.svg';
import AppInput from '../components/input/app-input';

const Register: FunctionComponent = () => {
  const { t } = useTranslation();
  const [] = useState();

  return (
    <BoxedContainer background={background.src} title={t('KaifStore')}>
      <Typography
        variant={'h4'}
        component={'h2'}
        fontWeight={'bold'}
        textAlign={'left'}
        marginBottom={'1rem'}
      >
        {t('Register.CreateAccount')}
      </Typography>
      <Typography
        variant={'h6'}
        component={'h6'}
        color={'grey.100'}
        maxWidth={'38ch'}
        marginBottom={'1rem'}
        fontWeight={700}
      >
        {t('Register.CreateAccountReason')}
      </Typography>
      <AppInput
        sx={{
          my: 2,
        }}
        inputProps={{
          value: '',
          startAdornment: (
            <AppIcon width={20} height={20} htmlColor={'white'}>
              <EmailIcon />
            </AppIcon>
          ),
          placeholder: 'Name',
        }}
      />
    </BoxedContainer>
  );
};

export default Register;
