import { ReactNode } from 'react';

export type LinkItem = {
  name: string;
  path: string;
  current: boolean;
  icon: ReactNode;
  subPaths?: string[];
};
