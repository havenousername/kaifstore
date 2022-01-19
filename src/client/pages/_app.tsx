import { AppProps } from 'next/app';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import kaifstoreTheme from '../theme/kaifstoreTheme';
import Head from 'next/head';
import '../styles/app.css';
import '../i18n';
import { useTranslation } from 'react-i18next';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme(kaifstoreTheme);
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('KaifStore')}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
