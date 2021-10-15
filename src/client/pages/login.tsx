import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import background from '../assets/background-login.png';
import { useTranslation } from 'react-i18next';
import kaifStoreColors from '../theme/kaifstoreColors';
import AppInput from '../components/app-input';
import { useCallback, useState } from 'react';
import AppIcon from '../components/app-icon';
import DontShowEyeIcon from '../assets/icons/dont-show-eye.svg';
import ShowEyeIcon from '../assets/icons/show-eye.svg';
import EmailIcon from '../assets/icons/at.svg';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    background: 'url(' + background.src + ')',
    backgroundPosition: 'center top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    backgroundColor: '#000102',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const Login = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [email],
  );

  const onPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [password],
  );

  const onPasswordShowChange = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <>
      <div className={classes.root}>
        <Container className={classes.container} maxWidth="lg">
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
              height: 540,
              width: 540,
              p: 10,
            }}
          >
            <Typography
              variant={'h4'}
              component={'h2'}
              fontWeight={'bold'}
              textAlign={'left'}
              marginBottom={'1.5rem'}
            >
              {t('LoginPage.Login')}
            </Typography>
            <Typography
              variant={'h6'}
              component={'h6'}
              color={kaifStoreColors.whiteTransparent}
            >
              {t('LoginPage.LoginInfo')}
            </Typography>
            <AppInput
              inputProps={{
                value: email,
                onChange: onEmailChange,
                startAdornment: (
                  <AppIcon width={20} height={20} htmlColor={'white'}>
                    <EmailIcon />
                  </AppIcon>
                ),
                placeholder: t('LoginPage.EmailPlaceholder'),
                sx: {
                  marginBottom: '2rem',
                  marginTop: '2rem',
                },
              }}
            />
            <AppInput
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
            <Button variant={'contained'} color={'primary'} type={'button'}>
              {t('LoginPage.Enter')}
            </Button>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Login;
