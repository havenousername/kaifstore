import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './products.model';

@Table({ tableName: 'bags' })
export class Bag extends Model<Bag> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryKey
  @Column
  id: number;

  @ApiProperty({ example: 1, description: 'Product count' })
  @AllowNull(false)
  @Column({ type: DataType.SMALLINT })
  productCount: number;

  @ApiProperty({ example: true, description: 'Delivery' })
  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN })
  delivery: number;

  @ApiProperty({
    example: 'Some characteristic',
    description: 'Characteristic',
  })
  @AllowNull(true)
  @Column({ type: DataType.STRING(300) })
  characteristic: number;

  @ApiProperty({
    example: 'Some characteristic',
    description: 'Characteristic',
  })
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  @Column
  product: Product;
}
