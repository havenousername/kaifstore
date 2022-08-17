import { CssBaseline } from '@mui/material';
import Head from 'next/head';
import '../styles/app.css';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { AppPropsWithLayout } from '../interfaces/pages-layout';
import AppTheme from '../components/functional/app-theme';
import useCheckAuthentication from '../hooks/use-check-authentication';
import { AuthenticationContext } from '../context/authenticated.context';
import GlobalSnackbar from '../components/global-snackbar';
import { AppContext } from 'next/app';
import { BaseUrlContext } from '../context/baseurl.context';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { t } = useTranslation();
  const getLayout = Component.getLayout ?? ((page) => page);
  const getComponent = getLayout(<Component {...pageProps} />);

  const { user, authenticated, checkAuthentication } = useCheckAuthentication();

  return (
    <>
      <Head>
        <title>{t('KaifStore')}</title>
      </Head>
      <AppTheme>
        <CssBaseline />
        <GlobalSnackbar>
          <BaseUrlContext.Provider value={{ baseUrl: pageProps.baseUrl }}>
            <AuthenticationContext.Provider
              value={{ user, authenticated, checkAuthentication }}
            >
              {getComponent}
            </AuthenticationContext.Provider>
          </BaseUrlContext.Provider>
        </GlobalSnackbar>
      </AppTheme>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  let pageProps: Record<string, string> = {};
  pageProps.baseUrl = process.env.NEXT_PUBLIC_ROOT_URL;
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
export default MyApp;
