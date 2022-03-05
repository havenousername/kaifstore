import { FormSelectProps } from '../../../interfaces/input-props';
import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import AppSelect from '../app-select';

const FormSelect: <TFieldValues>(
  args: FormSelectProps<TFieldValues>,
) => ReactElement = ({ control, name, selectProps, helperProps, sx }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={sx}>
          <AppSelect
            error={!!error}
            value={value}
            onChange={onChange}
            {...selectProps}
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

export default FormSelect;
