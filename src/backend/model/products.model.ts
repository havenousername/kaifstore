import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import {
  ProductMeasure,
  productMeasures,
} from '../interfaces/product-measure.enum';
import { ProductType } from '../interfaces/product-type.enum';
import { ProductGroup } from './product-groups.model';
import { AlcoholProduct } from './alcohol-products.model';
import { ProductDiscount } from './product-discounts.model';

interface ProductCreationAttributes {
  name: string;
  price: number;
  costPrice: number;
  groupId: string;
  uuid?: string;
  allowToSell?: boolean;
  characteristics?: string[];
  quantity?: number;
  barcodes?: string[];
  measureName?: ProductMeasure;
  productType?: ProductType;
  alcoholId?: number;
  code?: string;
  description?: string;
  article?: string;
  tax?: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttributes> {
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
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  allowToSell: boolean;

  @ApiProperty({
    example: 456,
    description: 'Price',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: 100,
    description: 'Cost price',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  costPrice: number;

  @ApiProperty({
    examples: ['Black', 'White'],
    description: 'Characteristics',
    required: false,
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  characteristics?: string[];

  @ApiProperty({
    example: 1,
    description: 'Quantity',
  })
  @Default(1)
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
  barcodes?: string[];

  // enums
  @ApiProperty({
    example: 'm3',
    description: 'Product Measure',
    required: false,
  })
  @Default(ProductMeasure.PIECE)
  @Column({
    type: DataType.ENUM,
    values: productMeasures,
  })
  measureName: ProductMeasure;

  @ApiProperty({
    example: 1,
    description: 'Product Type',
    required: false,
  })
  @Default(ProductType.NORMAL)
  @Column({
    type: DataType.NUMBER,
  })
  productType: ProductType;

  @ApiProperty({
    example: 34,
    description: 'Group id',
  })
  @ForeignKey(() => ProductGroup)
  @Column({ type: DataType.UUID, allowNull: false })
  groupId: string;

  @BelongsTo(() => ProductGroup, 'uuid')
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
    example: '199',
    description: 'Code',
    required: false,
  })
  @Column({ type: DataType.STRING(5), allowNull: true })
  code?: string;

  @ApiProperty({
    example: 'Tutus Mac Barren Absolute Choice is a very nice product',
    description: 'Description of description',
    required: false,
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;

  @ApiProperty({
    example: 233,
    description: 'Article',
    required: false,
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  article?: number;

  @ApiProperty({
    example: 'NO_VAT',
    description: 'VAT tax',
    required: false,
  })
  @Default('NO_VAT')
  @Column({ type: DataType.STRING(20), allowNull: false })
  tax: string;

  @HasMany(() => ProductDiscount)
  products: ProductDiscount[];
}
