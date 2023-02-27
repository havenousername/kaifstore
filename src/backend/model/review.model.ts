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
import { User } from './users.model';

@Table({ tableName: 'reviews' })
export class Review extends Model<Review> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryKey
  @Column
  id!: number;

  @ApiProperty({ example: 5, description: 'Rate' })
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  rate!: number;

  @ApiProperty({ example: 'Good product', description: 'Title' })
  @AllowNull(true)
  @Column({ type: DataType.STRING })
  title?: string;

  @ApiProperty({
    example: 'Really good product. I will put 5 to it',
    description: 'Description',
  })
  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  @Column
  user!: User;
}
