import { Box } from '@mui/material';
import AppBaseButton from './app-base-button';
import React from 'react';
import { FilterTabFooterProps } from '../interfaces/filter-tab-footer';

const FilterTabFooter = ({
  onSelect,
  onCancel,
  selectText,
  cancelText,
}: FilterTabFooterProps) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <AppBaseButton
        variant={'contained'}
        color={'primary'}
        type={'button'}
        sx={{
          borderRadius: '20px',
          flexBasis: '60%',
          py: '1rem',
        }}
        onClick={onSelect}
      >
        {selectText}
      </AppBaseButton>
      <AppBaseButton
        variant={'outlined'}
        color={'secondary'}
        sx={{
          borderColor: 'common.black',
          borderRadius: '20px',
          flexBasis: '35%',
          py: '1rem',
        }}
        type={'button'}
        onClick={onCancel}
      >
        {cancelText}
      </AppBaseButton>
    </Box>
  );
};

export default FilterTabFooter;
