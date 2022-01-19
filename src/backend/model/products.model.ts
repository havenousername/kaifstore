import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {
  ProductMeasure,
  productMeasures,
} from '../../interfaces/product-measure.enum';
import { ProductType, productTypes } from '../../interfaces/product-type.enum';
import { ProductGroup } from './product-groups.model';
import { AlcoholProduct } from './alcohol-products.model';
import { ProductDiscount } from './product-discounts.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
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
    example: 'Tutus Mac Barren Absolute Choice',
    description: 'Product name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: false,
    description: 'Is allowed to sell',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  allowToSell: boolean;

  @ApiProperty({
    example: '456 000',
    description: 'Price',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: 1,
    description: 'Quantity',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @ApiProperty({
    examples: ['ABC-abc-1234', '0123-4567'],
    description: 'Barcodes',
    required: false,
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  barcodes: string[];

  // enums
  @ApiProperty({
    example: 'm3',
    description: 'Product Measure',
    required: false,
  })
  @Column({
    type: DataType.ENUM(...productMeasures),
  })
  measureName: ProductMeasure;

  @ApiProperty({
    example: 1,
    description: 'Product Type',
    required: false,
  })
  @Column({
    type: DataType.ENUM(...productTypes),
  })
  productType: ProductType;

  @ApiProperty({
    example: 34,
    description: 'Group id',
  })
  @ForeignKey(() => ProductGroup)
  @Column({ type: DataType.INTEGER, allowNull: false })
  groupId: number;

  @BelongsTo(() => ProductGroup)
  group: ProductGroup;

  @ApiProperty({
    example: 34,
    description: 'Alcohol id',
    required: false,
  })
  @ForeignKey(() => AlcoholProduct)
  @Column({ type: DataType.INTEGER, allowNull: true })
  alcoholId?: number;

  @BelongsTo(() => AlcoholProduct)
  alcohol?: AlcoholProduct;

  @ApiProperty({
    example: 199,
    description: 'Code',
    required: false,
  })
  @Column({ type: DataType.SMALLINT, allowNull: true })
  code?: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Parent UUID',
    required: false,
  })
  @Column({ type: DataType.UUID, allowNull: true })
  parentUuid?: string;

  @ApiProperty({
    example: 'Tutus Mac Barren Absolute Choice is a very nice product',
    description: 'Description of description',
    required: false,
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;

  @ApiProperty({
    example: 'Tutus Mac Barren Absolute Choice is a very nice product',
    description: 'Description of description',
    required: false,
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  article?: number;

  @ApiProperty({
    example: 'NO_VAT',
    description: 'VAT tax',
    required: false,
  })
  @Column({ type: DataType.STRING(20), allowNull: false })
  tax: string;

  @HasMany(() => ProductDiscount)
  products: ProductDiscount[];
}
