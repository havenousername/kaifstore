import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './products.model';
import { Discount } from './discounts.model';

interface ProductDiscountAttributes {
  productId: number;
  discountId: number;
}

@Table({ tableName: 'product_discounts' })
export class ProductDiscount extends Model<
  ProductDiscount,
  ProductDiscountAttributes
> {
  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Product)
  @PrimaryKey
  @Column
  productId: number;

  @BelongsTo(() => Discount)
  discount: Discount;

  @ForeignKey(() => Discount)
  @PrimaryKey
  @Column
  discountId: number;
}
