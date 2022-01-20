import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Stage, stages } from '../interfaces/stage.enum';
import { Bag } from './bag.model';
import { User } from './users.model';

export class Order extends Model<Order> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryKey
  @Column
  id: number;

  @ApiProperty({ example: false, description: 'Delivered' })
  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN })
  delivered: boolean;

  @ApiProperty({
    example:
      'Wed Jan 19 2022 02:07:01 GMT+0200 (Eastern European Standard Time)',
    description: 'Deliver at',
  })
  @AllowNull(true)
  @Column({ type: DataType.DATE })
  deliverAt?: Date;

  @ApiProperty({
    example: 'IEVA',
    description: 'Promocode',
  })
  @Column({ type: DataType.STRING })
  promocode: string;

  @ApiProperty({
    example: 'Ordered',
    description: 'Stage',
  })
  @AllowNull(false)
  @Column({ type: DataType.ENUM(...stages) })
  stage: Stage;

  @ApiProperty({
    example: 1,
    description: 'Bag id',
  })
  @ForeignKey(() => Bag)
  @AllowNull(false)
  @Column
  bagId: number;

  @BelongsTo(() => Bag)
  bag: Bag;

  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
