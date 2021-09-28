import { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material';
import kaifstoreTheme from '../theme/kaifstoreTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme(kaifstoreTheme);
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
