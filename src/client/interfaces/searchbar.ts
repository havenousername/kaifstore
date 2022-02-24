import { SyntheticEvent } from 'react';
import { SxProps } from '@mui/system';

export interface SearchbarProps {
  placeholder: string;
  value: string;
  onChange: (e: SyntheticEvent) => void;
  iconSx?: SxProps;
}
