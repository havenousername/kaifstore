import { Product } from '../../backend/model/products.model';

export type EditableProduct = Pick<
  Product,
  | 'name'
  | 'price'
  | 'costPrice'
  | 'quantity'
  | 'productType'
  | 'code'
  | 'articleNumber'
  | 'allowToSell'
  | 'description'
  | 'measureName'
> & {
  hasBarcode: boolean;
  discounts: { content: string; value: string }[];
  group: string;
  characteristics: { content: string; value: string }[];
  barCodes: { content: string; value: string }[];
};
