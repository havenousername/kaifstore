import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
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
import { Discount } from './discounts.model';
import { Attributes } from '../interfaces/attributes';

interface ProductCreationAttributes {
  name: string;
  price: number;
  costPrice: number;
  groupId: string;
  uuid: string;
  allowToSell?: boolean;
  tags?: string[];
  quantity?: number;
  barcodes?: string[];
  measurename?: keyof ProductMeasure;
  productType?: ProductType;
  alcoholId?: number;
  code?: string;
  description?: string;
  articleNumber?: number;
  tax?: string;
  images?: string[];

  currency: string;
  country: string;
  discountProhibited?: boolean;
  useParentVat?: boolean;
  variantsCount?: number;
  attributes?: string[];
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
    example: 'RUB',
    description: 'currency',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @ApiProperty({
    example: 'Russia',
    description: 'country',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @ApiProperty({
    example: 100,
    description: 'Cost price',
  })
  @Column({
    type: DataType.FLOAT,
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
  tags?: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  images: string[];

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
    example: false,
    description: 'discount prohibuted',
  })
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  discountProhibited: boolean;

  @ApiProperty({
    example: false,
    description: 'use parent vat',
  })
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  useParentVat: boolean;

  @ApiProperty({
    example: 2,
    description: 'variants count',
  })
  @Default(1)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  variantsCount: number;

  @ApiProperty({
    examples: ['ABC-abc-1234', '0123-4567'],
    description: 'Barcodes',
    required: false,
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  barCodes?: string[];

  @ApiProperty({
    examples: ['region:Siberia', 'tube_number:2'],
    description: 'Attributes',
    required: false,
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
  })
  attributes?: string[];

  // enums
  @ApiProperty({
    example: 'm3',
    description: 'Product Measure',
    required: false,
  })
  @Default(Object.keys(ProductMeasure)[0])
  @Column({
    type: DataType.ENUM,
    values: productMeasures,
  })
  measurename?: keyof ProductMeasure;

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
    example: '123e4567-e89b-12d3-a456-42661417400a',
    description: 'Group id',
  })
  @Column({ type: DataType.UUID, allowNull: false })
  @ForeignKey(() => ProductGroup)
  groupId: string;

  @BelongsTo(() => ProductGroup, { targetKey: 'uuid', foreignKey: 'groupId' })
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
  articleNumber?: number;

  @ApiProperty({
    example: 'NO_VAT',
    description: 'VAT tax',
    required: false,
  })
  @Default('NO_VAT')
  @Column({ type: DataType.STRING(20), allowNull: false })
  tax: string;

  @BelongsToMany(() => Discount, () => ProductDiscount)
  discounts: Discount[];

  get measureName(): ProductMeasure {
    return ProductMeasure[this.measurename];
  }

  get attribs(): Attributes[] {
    return this.attributes
      .map((i) => {
        const attribs = i.split(':');
        if (attribs.length === 2) {
          return { name: attribs[0], value: attribs[1] };
        } else {
          return;
        }
      })
      .filter((i) => !!i);
  }
}
