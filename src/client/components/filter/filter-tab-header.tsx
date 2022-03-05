import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const FilterTabHeader = ({
  onRestore,
  restoreText,
}: {
  onRestore: (e) => void;
  restoreText: string;
}) => {
  const theme = useTheme();
  return (
    <Box display={'flex'} justifyContent={'flex-end'}>
      <Typography
        variant={'h6'}
        component={'h5'}
        onClick={onRestore}
        color={'grey.300'}
        sx={{
          cursor: 'pointer',
          transition: theme.transitions.create(['color']),
          '&:hover': {
            color: 'common.white',
          },
        }}
      >
        {restoreText}
      </Typography>
    </Box>
  );
};

export default FilterTabHeader;
