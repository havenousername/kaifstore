import React, { useCallback, useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppInput from '../components/input/app-input';
import AppIcon from '../components/common/app-icon';
import AppCheckbox from '../components/input/app-checkbox';
import background from '../assets/background-login.png';
import AppBaseButton from '../components/common/app-base-button';
import { ReactComponent as DontShowEyeIcon } from '../assets/icons/dont-show-eye.svg';
import { ReactComponent as ShowEyeIcon } from '../assets/icons/show-eye.svg';
import { ReactComponent as EmailIcon } from '../assets/icons/at.svg';
import { useRouter } from 'next/router';
import useLogin from '../hooks/use-login';
import { AuthenticationContext } from '../context/authenticated.context';
import BoxedContainer from '../components/boxed-container';
import { SnackbarContext } from '../context/snackbar.context';

const Login = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { checkAuthentication } = useContext(AuthenticationContext);

  const goToPrivateRoute = async () => {
    await checkAuthentication();
    await router.push('/');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [doLogin, , error] = useLogin(goToPrivateRoute);
  const snackbar = useContext(SnackbarContext);

  const onEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [],
  );

  const onPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [],
  );

  const onPasswordShowChange = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onLoginTry = useCallback(async () => {
    await doLogin(email, password);
  }, [password, email, doLogin]);

  useEffect(() => {
    if (error) {
      snackbar.changeSeverity('error');
      snackbar.changeIsOpen(true);
      snackbar.changeMessage(t('LoginPage.Unsuccessful'));
    }
  }, [error, snackbar, t]);

  return (
    <>
      <BoxedContainer
        background={background.src}
        title={t('KaifStore')}
        footer={
          <>
            <Typography
              variant={'h5'}
              component={'h6'}
              color={'grey.100'}
              maxWidth={'38ch'}
              marginTop={'5rem'}
              display={'flex'}
              minWidth={'450px'}
              justifyContent={'space-between'}
              height={'auto'}
            >
              <span>{t('LoginPage.DontHaveAccount')}</span>
              <Link color={'secondary'} fontWeight={'600'} href={'/register'}>
                {t('LoginPage.Register')}
              </Link>
            </Typography>
          </>
        }
      >
        <Typography
          variant={'h4'}
          component={'h2'}
          fontWeight={'bold'}
          textAlign={'left'}
          marginBottom={'1rem'}
        >
          {t('LoginPage.Login')}
        </Typography>
        <Typography
          variant={'h6'}
          component={'h6'}
          color={'grey.100'}
          maxWidth={'38ch'}
          marginBottom={'1rem'}
        >
          {t('LoginPage.LoginInfo')}
        </Typography>
        <Box
          sx={{
            maxWidth: '18.75rem',
            width: '100%',
          }}
        >
          <AppInput
            sx={{
              my: 2,
            }}
            inputProps={{
              value: email,
              onChange: onEmailChange,
              startAdornment: (
                <AppIcon width={20} height={20} htmlColor={'white'}>
                  <EmailIcon />
                </AppIcon>
              ),
              placeholder: t('LoginPage.EmailPlaceholder'),
            }}
          />
          <AppInput
            sx={{
              my: 2,
            }}
            inputProps={{
              value: password,
              onChange: onPasswordChange,
              type: showPassword ? 'text' : 'password',
              startAdornment: (
                <AppIcon
                  width={20}
                  height={20}
                  htmlColor={'white'}
                  onClick={onPasswordShowChange}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <DontShowEyeIcon /> : <ShowEyeIcon />}
                </AppIcon>
              ),
              placeholder: t('LoginPage.PasswordPlaceholder'),
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <AppCheckbox
            labelProps={{
              label: t('LoginPage.RememberMe').toString(),
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: '1.5rem',
          }}
        >
          <AppBaseButton
            variant={'contained'}
            color={'primary'}
            type={'button'}
            onClick={onLoginTry}
          >
            {t('LoginPage.Enter')}
          </AppBaseButton>
        </Box>
      </BoxedContainer>
    </>
  );
};

export default Login;
