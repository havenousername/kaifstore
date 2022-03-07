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
  | 'measureName'
> & { hasBarcode: boolean; discounts: any[]; group: string };
