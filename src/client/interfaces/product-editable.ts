import { Product } from '../../backend/model/products.model';

export type EditableProduct = Pick<
  Product,
  | 'name'
  | 'price'
  | 'costPrice'
  | 'characteristics'
  | 'quantity'
  | 'barCodes'
  | 'productType'
  | 'code'
  | 'articleNumber'
  | 'allowToSell'
  | 'description'
> & { hasBarcode: boolean; discounts: any[]; group: string };
