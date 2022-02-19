import { ProductGroup } from '../model/product-groups.model';

export type ProductGroupLimited = Omit<
  ProductGroup,
  'uuid' | 'code' | 'description' | 'groupId' | 'createdAt' | 'updatedAt'
>;
