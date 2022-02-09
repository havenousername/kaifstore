import { ReactNode } from 'react';
import Navbar from './navbar';
import { Box } from '@material-ui/core';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <main>{children}</main>
      </Box>
    </>
  );
};

export default AppLayout;
