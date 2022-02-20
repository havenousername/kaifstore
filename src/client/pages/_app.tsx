import { CssBaseline, GlobalStyles } from '@mui/material';
import Head from 'next/head';
import '../styles/app.css';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { AppPropsWithLayout } from '../interfaces/pages-layout';
import AppTheme from '../components/app-theme';
import darkScrollbar from '@mui/material/darkScrollbar';
import { useEffect } from 'react';
import useCheckAuthentication from '../hooks/use-check-authentication';
import { AuthenticationContext } from '../context/authenticated.context';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { t } = useTranslation();
  const getLayout = Component.getLayout ?? ((page) => page);
  const getComponent = getLayout(<Component {...pageProps} />);

  const { user, authenticated, checkAuthentication } = useCheckAuthentication();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Head>
        <title>{t('KaifStore')}</title>
      </Head>
      <AppTheme>
        <GlobalStyles styles={{ ...darkScrollbar() }} />
        <CssBaseline />
        <AuthenticationContext.Provider
          value={{ user, authenticated, checkAuthentication }}
        >
          {getComponent}
        </AuthenticationContext.Provider>
      </AppTheme>
    </>
  );
};

export default App;
