import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import background from '../assets/background-login.png';
import { useTranslation } from 'react-i18next';

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
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              bgcolor: 'grey.50',
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: 1,
              fontWeight: 'bold',
              height: 400,
              width: 540,
            }}
          >
            <Typography variant={'h4'} component={'h2'} fontWeight={'bold'}>
              {t('Login')}
            </Typography>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Login;
