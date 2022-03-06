import { Box, Typography, useTheme } from '@mui/material';
import React, { ReactNode, useMemo } from 'react';
import { SxProps } from '@mui/system';

const AppTag = ({
  index,
  tag,
  sx,
}: {
  index: number;
  tag: string | ReactNode;
  sx: SxProps;
}) => {
  const theme = useTheme();
  const getColor = useMemo<string>(
    () =>
      index % 2 === 0
        ? theme.palette.common.black
        : theme.palette.primary.light,
    [index, theme.palette.common.black, theme.palette.primary.light],
  );
  return (
    <Box
      sx={{
        borderRadius: '7px',
        borderColor: getColor,
        border: `1px solid ${getColor}`,
        width: '95px',
        height: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <Typography variant={'h6'}>{tag}</Typography>
    </Box>
  );
};

export default AppTag;
