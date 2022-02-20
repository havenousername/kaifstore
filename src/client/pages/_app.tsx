import { CssBaseline, GlobalStyles } from '@mui/material';
import Head from 'next/head';
import '../styles/app.css';
import '../i18n';
import { useTranslation } from 'react-i18next';
import { AppPropsWithLayout } from '../interfaces/pages-layout';
import AppTheme from '../components/app-theme';
import darkScrollbar from '@mui/material/darkScrollbar';
import useSWR from 'swr';
import { User } from '../../backend/model/users.model';
import { useEffect } from 'react';
const fetcher = (url) => fetch(url).then((r) => r.json());

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { t } = useTranslation();
  const getLayout = Component.getLayout ?? ((page) => page);
  const getComponent = getLayout(<Component {...pageProps} />);
  const { data } = useSWR<User>('/v1/auth', fetcher);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
