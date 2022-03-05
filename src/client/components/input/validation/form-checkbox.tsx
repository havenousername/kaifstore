import { FormCheckboxProps } from '../../../interfaces/input-props';
import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import AppCheckbox from '../app-checkbox';

const FormCheckbox: <TFieldValues>(
  args: FormCheckboxProps<TFieldValues>,
) => ReactElement = ({ control, name, checkboxProps, helperProps, sx }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={sx}>
          <AppCheckbox
            labelProps={checkboxProps.labelProps}
            checkboxProps={{
              ...checkboxProps.checkboxProps,
              onChange,
              value,
            }}
          />
          {error && (
            <FormHelperText error={!!error} {...helperProps}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default FormCheckbox;
