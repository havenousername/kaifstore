import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import kaifstoreTheme from '../theme/kaifstoreTheme';
import Head from 'next/head';
import '../styles/app.css';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { AppPropsWithLayout } from '../interfaces/pages-layout';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const theme = createTheme(kaifstoreTheme);
  const { t } = useTranslation();

  const getLayout = Component.getLayout ?? ((page) => page);

  const getComponent = getLayout(<Component {...pageProps} />);

  return (
    <>
      <Head>
        <title>{t('KaifStore')}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getComponent}
      </ThemeProvider>
    </>
  );
};

export default App;
