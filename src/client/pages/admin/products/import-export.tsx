import { NextPageWithLayout } from '../../../interfaces/pages-layout';
import React, { ReactElement } from 'react';
import AdminTheme from '../../../components/functional/admin-theme';
import AppLayout from '../../../components/functional/app-layout';
import { Box, Typography } from '@mui/material';

const ImportExport: NextPageWithLayout = () => {
  return (
    <Box
      sx={{
        padding: '1rem 8rem 4rem',
      }}
    >
      <Typography>{'Import/Export'}</Typography>
    </Box>
  );
};

ImportExport.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminTheme>
      <AppLayout hasHeader={false}>{page}</AppLayout>{' '}
    </AdminTheme>
  );
};

export default ImportExport;
