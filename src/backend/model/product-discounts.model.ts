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

@Table({ tableName: 'product-discounts' })
export class ProductDiscount extends Model<ProductDiscount> {
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
  userId: number;
}
