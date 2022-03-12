import { FormMultiSelectProps } from '../../../interfaces/input-props';
import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import AppSearchSelect from '../app-search-select';

const FormMultiSelect: <TFieldValues>(
  args: FormMultiSelectProps<TFieldValues>,
) => ReactElement = ({ control, name, selectProps, helperProps, sx }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={sx}>
          <AppSearchSelect
            error={!!error}
            selected={
              !value
                ? []
                : typeof value === 'string'
                ? (value as string[]).map((i) => ({
                    content: i,
                    value: i,
                  }))
                : value
            }
            onOptionChange={(v) => {
              onChange(v);
            }}
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

export default FormMultiSelect;
