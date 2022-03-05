import React, { FunctionComponent, ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { SxProps } from '@mui/system';

const BoxedContainer: FunctionComponent<{
  background: string;
  title: string;
  children: ReactNode;
  sxBox?: SxProps;
}> = ({ title, background, children, sxBox }) => {
  return (
    <Box
      sx={{
        background: 'url(' + background + ')',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        backgroundColor: '#000102',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant={'h2'} component={'h1'} marginBottom={'3.5rem'}>
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column' },
            alignItems: 'start',
            backgroundColor: 'grey.50',
            overflow: 'hidden',
            justifyContent: 'flex-start',
            borderRadius: '47px',
            boxShadow: 1,
            fontWeight: 'bold',
            minHeight: 500,
            height: '100%',
            width: 500,
            px: 10,
            py: 8,
            ...sxBox,
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default BoxedContainer;
