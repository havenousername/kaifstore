import { ProductGroup } from '../model/product-groups.model';

export type ProductGroupLimited = Omit<
  ProductGroup,
  'code' | 'description' | 'groupId' | 'createdAt' | 'updatedAt'
>;
