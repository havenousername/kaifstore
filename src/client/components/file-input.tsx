import { Box, Input, InputLabel } from '@mui/material';
import React, { FC, ForwardedRef, forwardRef, ReactNode } from 'react';
import { SxProps } from '@mui/system';

const FileInput: FC<{
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  param: number;
  label: string | ReactNode;
  sxLabel?: SxProps;
  ref: ForwardedRef<HTMLInputElement>;
  accept?: string;
}> = forwardRef(
  (
    { onChangeInput, param, label, sxLabel, accept = '.jpeg, .jpg, .png' },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <Box>
        <InputLabel
          htmlFor={'image-' + param.toString()}
          title="Click to choose a file"
          sx={{
            textTransform: 'initial',
            color: 'common.white',
            cursor: 'pointer',
            ...sxLabel,
          }}
        >
          {label}
        </InputLabel>
        <Input
          id={'image-' + param.toString()}
          ref={ref}
          type={'file'}
          onChange={onChangeInput}
          inputProps={{
            accept,
          }}
          style={{
            display: 'none',
          }}
        />
      </Box>
    );
  },
);

export default FileInput;
