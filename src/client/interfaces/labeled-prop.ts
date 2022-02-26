import { ReactNode } from 'react';

export type ItemProp<T> = {
  label: string;
  content: T | ReactNode;
};
