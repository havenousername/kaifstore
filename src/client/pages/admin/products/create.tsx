import { Box } from '@mui/material';
import { NextPageWithLayout } from '../../../interfaces/pages-layout';
import React, { ReactElement } from 'react';
import AdminTheme from '../../../components/functional/admin-theme';
import AppLayout from '../../../components/functional/app-layout';

const ProductCreate: NextPageWithLayout = () => {
  return <Box>Create product</Box>;
};

ProductCreate.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminTheme>
      <AppLayout hasHeader={false}>{page}</AppLayout>{' '}
    </AdminTheme>
  );
};

export default ProductCreate;
