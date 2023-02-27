import { ValueOf } from './valueof';

export const ProductTypes = {
  NORMAL: 0,
  TOBACCO_MARKED: 1,
  ELECTRONICS: 2,
  LP_CLOTHES: 3,
  LP_LINENS: 4,
  MILK: 5,
  NCP: 6,
  NOT_TRACKED: 7,
  OTP: 8,
  PERFUMERY: 9,
  SHOES: 10,
  TIRES: 11,
  TOBACCO: 12,
  WATER: 13,
} as const;

export type ProductType = ValueOf<typeof ProductTypes>;

export const productTypes = Object.values(ProductTypes);
