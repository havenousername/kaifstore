import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { SxProps } from '@mui/system';

const GroupInitialButton = ({
  text,
  onClick,
  icon,
  disabled = false,
  sx = {},
}: {
  sx?: SxProps;
  text: string;
  onClick: () => void;
  disabled?: boolean;
  icon: ReactNode;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.600',
        borderRadius: '0.65rem',
        borderColor: 'grey.500',
        borderWidth: '2px',
        borderStyle: 'solid',
        transition: 'all 0.2s ease-in',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'grey.800',
        },
        '&[aria-disabled="true"]': {
          pointerEvents: 'none',
          backgroundColor: 'secondary.contrastText',
          '& > *': {
            color: 'grey.400',
          },
        },
        ...sx,
      }}
      aria-disabled={disabled}
      display={'flex'}
      alignItems={'center'}
      px={'2rem'}
      py={'1.5rem'}
      onClick={() => onClick()}
    >
      <Box
        px={'2.5rem'}
        py={'2rem'}
        sx={{
          backgroundColor: 'background.default',
          borderRadius: '0.8rem',
          marginRight: '2rem',
          width: '125px',
          height: '125px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <Typography variant={'h2'} component={'h2'}>
        {text}
      </Typography>
    </Box>
  );
};

export default GroupInitialButton;
