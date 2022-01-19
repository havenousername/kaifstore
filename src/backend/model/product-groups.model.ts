import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'product-groups' })
export class ProductGroup extends Model<ProductGroup> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID',
  })
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
  })
  uuid: string;

  @ApiProperty({
    example: '199',
    description: 'Code',
    required: false,
  })
  @Column({ type: DataType.STRING(5), allowNull: true })
  code?: string;

  @ApiProperty({
    example: 'Groceries',
    description: 'Groceries group can only contain apples, bananas etc.',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Groceries group can only contain apples, bananas etc.',
    description: 'Description of description',
  })
  @Column({ type: DataType.ENUM })
  description: string;
}
