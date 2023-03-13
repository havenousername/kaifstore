import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';

export type NextPageWithLayout<Props = unknown> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<AppProps>;
} & { pageProps: any & { baseUrl: string } };
