import { ReactNode } from 'react';

export interface AppTabsProps {
  currentTab: number;
  onChange: (newTab: number) => void;
  items: Array<TabItemProp>;
  ariaLabel?: string;
}

export type TabItemProp = {
  label: string;
  content: string | ReactNode;
  update: boolean;
};
