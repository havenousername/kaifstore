import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ProductMeasure } from '../../interfaces/product-measure.enum';
import { ProductType } from '../../interfaces/product-type.enum';
import { Attributes } from '../../interfaces/attributes';

export class MakeImportDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-42661417400a',
    description: 'Uuid',
  })
  @IsUUID('all', { message: 'Should be always string' })
  readonly uuid: string;

  @ApiProperty({
    example: 'Product',
    description: 'Name',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Group',
    description: 'Is group or product',
  })
  @IsString()
  readonly group: string;

  @ApiProperty({
    example: 34,
    description: 'Product price',
  })
  @IsNumber()
  readonly price?: number;

  @ApiProperty({
    example: 23,
    description: 'Product cost price',
  })
  @IsNumber()
  readonly costPrice?: number;

  @ApiProperty({
    example: 190,
    description: 'Product quantity',
  })
  @IsNumber({}, { message: 'Should be a number' })
  readonly quantity?: number;

  @ApiProperty({
    example: 999,
    description: 'code',
  })
  @IsNumber()
  code?: number;

  @ApiProperty({
    example: ProductMeasure.KG,
    description: 'Product Measure',
  })
  @IsString()
  measureName?: ProductMeasure;

  @ApiProperty({
    example: false,
    description: 'Allow to sell',
  })
  @IsBoolean()
  allowToSell?: boolean;

  @ApiProperty({
    example: 1,
    description: 'Product Type',
    required: false,
  })
  @IsString({ message: 'Should be string' })
  readonly productType?: ProductType;

  @ApiProperty({
    example: 'This is description of the product',
    description: 'Description',
  })
  @IsString()
  readonly description?: string;

  @ApiProperty({
    example: 91222,
    description: 'Article Number',
  })
  @IsString()
  readonly articleNumber?: number;

  @ApiProperty({
    example: 'NO_VAT',
    description: 'Tax',
  })
  @IsString()
  readonly tax?: string;

  @ApiProperty({
    examples: ['barcode1', 'barcode2'],
    description: 'Type',
  })
  @IsArray()
  readonly barCodes?: string[];

  @ApiProperty({
    description: 'Attributes {name, value} array',
  })
  @IsArray()
  readonly attributes?: Attributes[];

  @ApiProperty({
    description: 'currency',
    example: 'EUR',
  })
  @IsString({ message: 'Should be string' })
  readonly currency?: string;

  @ApiProperty({
    description: 'country',
    example: 'Moldova',
  })
  @IsString({ message: 'Should be string' })
  readonly country?: string;

  @ApiProperty({
    example: false,
    description: 'Allow to have discounts',
    required: false,
  })
  @IsBoolean({ message: 'Should be boolean' })
  readonly discountProhibited?: boolean;

  @ApiProperty({
    example: false,
    description: 'Use parent vat',
    required: false,
  })
  @IsBoolean({ message: 'Should be boolean' })
  readonly useParentVat?: boolean;

  @ApiProperty({
    example: 1,
    description: 'Variant count',
    required: false,
  })
  @IsNumber({}, { message: 'Should be number' })
  readonly variantsCount?: number;
}
