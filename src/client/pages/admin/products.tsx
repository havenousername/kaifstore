import { NextPageWithLayout } from '../../interfaces/pages-layout';
import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import AppLayout from '../../components/functional/app-layout';

const Catalog: NextPageWithLayout = () => {
  return (
    <Box>
      <Typography
        variant={'h4'}
        component={'h4'}
        padding={(theme) => theme.spacing(2, 3)}
        fontWeight={600}
      >
        {'Products'}
      </Typography>
    </Box>
  );
};

Catalog.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Catalog;
