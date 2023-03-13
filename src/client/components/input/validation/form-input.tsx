import { ReactElement } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { FormInputProps } from '../../../interfaces/input-props';
import AppInput from '../app-input';
import { FormControl, FormHelperText } from '@mui/material';

const FormInput: <TFieldValues extends FieldValues>(
  args: FormInputProps<TFieldValues>,
) => ReactElement = ({
  control,
  name,
  appInputProps = { sx: {} },
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
              ...appInputProps.sx,
            }}
            inputProps={{
              value,
              onChange,
              ...inputProps,
              error: !!error,
            }}
          />
          {error && (
            <FormHelperText
              error={!!error}
              {...helperProps}
              sx={{ ...helperProps?.sx, height: '3.1rem' }}
            >
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default FormInput;
