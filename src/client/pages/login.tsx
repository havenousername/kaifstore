import React, { useCallback, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import kaifStoreColors from '../theme/kaifstoreColors';
import AppInput from '../components/app-input';
import AppIcon from '../components/app-icon';
import AppCheckbox from '../components/app-checkbox';
import background from '../assets/background-login.png';
import AppBaseButton from '../components/app-base-button';
import { ReactComponent as DontShowEyeIcon } from '../assets/icons/dont-show-eye.svg';
import { ReactComponent as ShowEyeIcon } from '../assets/icons/show-eye.svg';
import { ReactComponent as EmailIcon } from '../assets/icons/at.svg';
import { useRouter } from 'next/router';
import useLogin from '../hooks/use-login';

const Login = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const goToPrivateRoute = async () => {
    await router.push('/settings');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [doLogin] = useLogin(goToPrivateRoute);

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

  return (
    <>
      <Box
        sx={{
          background: 'url(' + background.src + ')',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          backgroundColor: '#000102',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant={'h1'} component={'h1'} marginBottom={'3.5rem'}>
            {t('KaifStore')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column' },
              alignItems: 'start',
              bgcolor: 'grey.50',
              overflow: 'hidden',
              justifyContent: 'flex-start',
              borderRadius: '47px',
              boxShadow: 1,
              fontWeight: 'bold',
              height: 500,
              width: 500,
              px: 10,
              py: 8,
            }}
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
              color={kaifStoreColors.whiteTransparent}
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
                  label: t('LoginPage.RememberMe'),
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
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
