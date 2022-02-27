import { ReactElement } from 'react';

export type ItemProp<T> = {
  label: string;
  content: T | ReactElement;
};
