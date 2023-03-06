export enum ProductMeasure {
  PIECE = 'шт',
  KG = 'кг',
  LITER = 'л',
  SQUARE_METER = 'm2',
  CUBIC_METER = 'm3',
  KIT = 'компл',
}

export type ProductMeasureEnum =
  | 'PIECE'
  | 'LITER'
  | 'SQUARE_METER'
  | 'CUBIC_METER'
  | 'KIT';

export const productMeasures = Object.values(ProductMeasure);
