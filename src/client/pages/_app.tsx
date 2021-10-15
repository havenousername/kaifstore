import { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material';
import kaifstoreTheme from '../theme/kaifstoreTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import '../styles/app.css';
import '../i18n';

export const theme = createTheme(kaifstoreTheme);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Kaifstore</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
