import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDiscount } from './product-discounts.model';
import { Product } from './products.model';

export interface DiscountCreationAttribute {
  amount: number;
  name?: string;
  description?: string;
  image?: string;
}

@Table({ tableName: 'discounts' })
export class Discount extends Model<Discount, DiscountCreationAttribute> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 20,
    description: 'Percentage of discount from product',
  })
  @Column({
    type: DataType.SMALLINT,
  })
  amount: number;

  @ApiProperty({
    example: 'Winter discount',
    description: 'Name of discount',
    required: false,
  })
  @Column({
    type: DataType.STRING,
  })
  name: number;

  @ApiProperty({
    example: 'https://github.com/havenousername/kaifstore',
    description: 'String path to image',
    required: false,
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @BelongsToMany(() => Product, () => ProductDiscount)
  discounts: ProductDiscount[];
}
