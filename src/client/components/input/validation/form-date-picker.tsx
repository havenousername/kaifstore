import { FormDatePickerProps } from '../../../interfaces/input-props';
import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import LocalizedDatePicker from '../localized-date-picker';

const FormSelect: <TFieldValues>(
  args: FormDatePickerProps<TFieldValues>,
) => ReactElement = ({ control, name, dateProps, helperProps, sx }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={sx}>
          <LocalizedDatePicker
            value={value}
            onChange={onChange}
            {...dateProps}
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
