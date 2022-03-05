import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { FormInputProps } from '../../../interfaces/input-props';
import AppInput from '../app-input';
import { FormControl, FormHelperText } from '@mui/material';

const FormInput: <TFieldValues>(
  args: FormInputProps<TFieldValues>,
) => ReactElement = ({
  control,
  name,
  appInputProps,
  inputProps,
  helperProps,
  sx,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={sx}>
          <AppInput
            {...appInputProps}
            sx={{
              mb: error ? 0 : '3.1rem',
            }}
            inputProps={{
              value,
              onChange,
              ...inputProps,
              error: !!error,
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

export default FormInput;
