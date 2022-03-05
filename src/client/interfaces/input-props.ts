import { Control, Path } from 'react-hook-form/dist/types';
import {
  FormControlLabelProps,
  FormHelperTextProps,
  InputBaseProps,
  SelectChangeEvent,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { maskMap } from '../components/input/localized-date-picker';
import { CheckboxProps } from '@mui/material/Checkbox';

export interface FormInputProps<TFieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  appInputProps?: AppInputProps;
  inputProps?: InputBaseProps;
  helperProps?: FormHelperTextProps;
  sx?: SxProps;
}

export type FormSelectProps<TFieldValues> = Omit<
  FormInputProps<TFieldValues>,
  'appInputProps' | 'inputProps'
> & {
  selectProps: Omit<
    AppSelectProps,
    'value' | 'onChange' | 'error' | 'inputProps'
  >;
};

export type FormDatePickerProps<TFieldValues> = Omit<
  FormInputProps<TFieldValues>,
  'appInputProps' | 'inputProps'
> & {
  dateProps: Omit<AppDatePickerProps, 'value' | 'onChange'>;
};

export type FormCheckboxProps<TFieldValues> = Omit<
  FormInputProps<TFieldValues>,
  'appInputProps' | 'inputProps'
> & {
  checkboxProps: AppCheckBoxProps;
};

export type AppInputProps = {
  inputProps?: InputBaseProps;
  sx?: SxProps<Theme>;
  type?: string;
};

export type AppSelectProps = {
  inputProps?: AppInputProps;
  value: string;
  onChange(e: SelectChangeEvent, child: ReactNode): void;
  values: { value: string; content: ReactNode | string }[];
  error: boolean;
};

export type AppDatePickerProps = {
  locale: keyof typeof maskMap;
  inputProps?: AppInputProps;
  value: string;
  onChange(date: Date, keyboardInputValue?: string): void;
};

export type AppCheckBoxProps = {
  checkboxProps?: CheckboxProps;
  labelProps?: Omit<FormControlLabelProps, 'control'>;
};
