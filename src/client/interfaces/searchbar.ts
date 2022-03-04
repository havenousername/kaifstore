import { SyntheticEvent } from 'react';
import { SxProps } from '@mui/system';

export interface SearchbarProps {
  placeholder: string;
  value: string;
  onChange: (e: SyntheticEvent | string) => void;
  iconSx?: SxProps;
  sx?: SxProps;
}

export type SearchFiltersState = {
  priceRange: [number, number];
  discountAmount: number | null;
  rating: number | null;
};

export type FilterTypeProp = 'priceRange' | 'discountAmount' | 'rating';
