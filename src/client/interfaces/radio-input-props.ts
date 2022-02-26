import { ItemProp } from './labeled-prop';
import { ChangeEvent } from 'react';

export interface RadioInputProps<T> {
  label?: string;
  defaultValue: T;
  items: (ItemProp<T> & { disabled: boolean })[];
  value: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
}
