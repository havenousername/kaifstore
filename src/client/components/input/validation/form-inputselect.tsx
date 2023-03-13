import { FormInputSelect } from '../../../interfaces/input-props';
import { ReactElement } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import InputSelect from '../input-select';

const FormSelect: <TFieldValues extends FieldValues, Options>(
  args: FormInputSelect<TFieldValues, Options>,
) => ReactElement = ({ control, name, helperProps, sx, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={sx}>
          <InputSelect
            selected={value}
            onChange={(v) => onChange(v)}
            {...props}
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
