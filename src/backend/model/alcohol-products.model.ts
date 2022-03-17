import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'alcohol_products' })
export class AlcoholProduct extends Model<AlcoholProduct> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    examples: [291, 303.9],
    description: 'Alcohol codes',
    required: false,
  })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  alcoCodes: number[];

  @ApiProperty({
    example: 0.5,
    description: 'Alcohol by value',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
  })
  alcoholByValue: number;

  @ApiProperty({
    example: 293,
    description: 'Alcohol product kind code',
    required: false,
  })
  @Column({
    type: DataType.SMALLINT,
  })
  alcoholProductKindCode: number;

  @ApiProperty({
    example: 2,
    description: 'Tare value',
    required: false,
  })
  @Column({
    type: DataType.SMALLINT,
  })
  tareVolume: number;
}
