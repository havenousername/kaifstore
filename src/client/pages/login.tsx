import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import background from '../assets/background-login.png';

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
    justifyContent: 'center',
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Container className={classes.container} maxWidth="lg">
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
            <Typography>Login</Typography>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Login;
