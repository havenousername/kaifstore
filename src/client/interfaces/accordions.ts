import { ReactNode } from 'react';

export type AccordionPropData = {
  name: string;
  summary: string | ReactNode;
  details: string | ReactNode | AccordionPropData[];
  ariaControls?: string;
  selected: boolean;
  id?: string;
};
