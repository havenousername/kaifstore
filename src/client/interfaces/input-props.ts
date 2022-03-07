import { Control, Path } from 'react-hook-form/dist/types';
import {
  FormControlLabelProps,
  FormHelperTextProps,
  InputBaseProps,
  SelectChangeEvent,
  SelectProps,
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

export type FormMultiSelectProps<TFieldValues> = Omit<
  FormInputProps<TFieldValues>,
  'appInputProps' | 'inputProps'
> & {
  selectProps: Omit<AppMultiSelect, 'selected' | 'onOptionChange' | 'error'>;
};

export type FormInputSelect<TFieldValues, Options> = Omit<
  AppInputSelect<Options>,
  'selected' | 'onChange'
> &
  Omit<FormInputProps<TFieldValues>, 'appInputProps' | 'inputProps'>;

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
  value: string | string[];
  inputProps?: AppInputProps;
  selectProps?: SelectProps<string | string[]>;
  onChange(e: SelectChangeEvent, child: ReactNode): void;
  values: SelectValue[];
  error: boolean;
};

export type AppMultiSelect = Omit<
  AppSelectProps,
  'inputProps' | 'selectProps' | 'onChange' | 'value'
> & {
  selected: SelectValue[];
  placeholder?: string;
  noElements?: string | ReactNode;
  sxInput?: SxProps;
  sxList?: SxProps;
  sxListItem?: SxProps;
  sxTag?: SxProps;
  onOptionChange?: (values: SelectValue[]) => void;
  disableOptionAddition?: boolean;
};

export type SelectValue = { value: string; content: ReactNode | string };

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

export type AppInputSelect<Type> = {
  options: { content: string | ReactNode; value: Type }[];
  selected: Type;
  onChange(t: Type, c: string | ReactNode): void;
  sxRoot?: SxProps;
  sxItem?: SxProps;
};
