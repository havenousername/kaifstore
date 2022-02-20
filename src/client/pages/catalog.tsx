import { NextPageWithLayout } from '../interfaces/pages-layout';
import React, { ReactElement } from 'react';
import AppLayout from '../components/app-layout';

const Catalog: NextPageWithLayout = () => {
  return <div>Catalog</div>;
};

Catalog.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Catalog;
