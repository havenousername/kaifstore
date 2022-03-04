import { ItemProp } from './labeled-prop';

export interface AppTabsProps {
  currentTab: number;
  onChange: (newTab: number) => void;
  items: Array<TabItemProp>;
  ariaLabel?: string;
}

export type TabItemProp = ItemProp<string> & {
  update: boolean;
};
