import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.model';
import { Product } from './products.model';

export class FavouriteUserProduct extends Model<FavouriteUserProduct> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryKey
  @Column
  id: number;

  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  @Column
  user: User;

  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
