import { CssBaseline, GlobalStyles } from '@mui/material';
import Head from 'next/head';
import '../styles/app.css';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { AppPropsWithLayout } from '../interfaces/pages-layout';
import AppTheme from '../components/app-theme';
import darkScrollbar from '@mui/material/darkScrollbar';

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { t } = useTranslation();
  const getLayout = Component.getLayout ?? ((page) => page);
  const getComponent = getLayout(<Component {...pageProps} />);

  return (
    <>
      <Head>
        <title>{t('KaifStore')}</title>
      </Head>
      <AppTheme>
        <GlobalStyles styles={{ ...darkScrollbar() }} />
        <CssBaseline />
        {getComponent}
      </AppTheme>
    </>
  );
};

export default App;
