import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';
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
    example: false,
    description: 'excise',
  })
  @ApiProperty({
    type: DataType.BOOLEAN,
  })
  excise: boolean;

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
    example: 293,
    description: 'Alcohol product strength',
    required: false,
  })
  @Column({
    type: DataType.FLOAT,
  })
  strength: number;

  @ApiProperty({
    example: 2,
    description: 'Product type',
    required: false,
  })
  @Default(0)
  @Column({
    type: DataType.SMALLINT,
  })
  type: number;

  @ApiProperty({
    example: 2,
    description: 'Tare volume',
    required: false,
  })
  @Column({
    type: DataType.FLOAT,
  })
  volume: number;
}
