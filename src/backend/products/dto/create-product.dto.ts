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

export class CreateProductDto {
  @ApiProperty({ example: 'Big hookah plate', description: 'Product name' })
  @IsString({ message: 'Should be always string' })
  readonly name: string;

  @ApiProperty({ example: 140, description: 'Product price' })
  @IsNumber({}, { message: 'Should be always number' })
  readonly price: number;

  @ApiProperty({ example: 30, description: 'Product cost price' })
  @IsNumber({}, { message: 'Should be always number' })
  readonly costPrice: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Group id',
  })
  @IsUUID('all', { message: 'Should be always uuid' })
  readonly groupId: string;

  @ApiProperty({
    example: false,
    description: 'Allow to sell product',
    required: false,
  })
  @IsBoolean({ message: 'Should be boolean' })
  readonly allowToSell?: boolean;

  @ApiProperty({
    examples: ['blue', 'white'],
    description: 'Characteristics',
    required: false,
  })
  @IsArray({ message: 'Should be array' })
  readonly characteristics?: string[];

  @ApiProperty({ example: 3, description: 'Quantity', required: false })
  @IsNumber({}, { message: 'Should be always number' })
  readonly quantity?: number;

  @ApiProperty({
    examples: ['ABC-abc-1234', '0123-4567'],
    description: 'Barcodes',
    required: false,
  })
  @IsArray({ message: 'Should be array' })
  readonly barCodes?: string[];

  @ApiProperty({
    example: 'm3',
    description: 'Product Measure',
    required: false,
  })
  @IsString({ message: 'Should be string' })
  readonly measureName?: ProductMeasure;

  @ApiProperty({
    example: 1,
    description: 'Product Type',
    required: false,
  })
  @IsString({ message: 'Should be string' })
  readonly productType?: ProductType;

  @ApiProperty({
    example: '199',
    description: 'Code',
    required: false,
  })
  @IsString({ message: 'Should be string' })
  readonly code?: string;

  @ApiProperty({
    example: 'Tutus Mac Barren Absolute Choice is a very nice product',
    description: 'Description of description',
    required: false,
  })
  @IsString({ message: 'Should be string' })
  readonly description?: string;

  @ApiProperty({
    example: 233,
    description: 'Article',
    required: false,
  })
  @IsNumber({}, { message: 'Should be number' })
  readonly articleNumber?: number;

  @ApiProperty({
    example: 'NO_VAT',
    description: 'Tax type',
    required: false,
  })
  @IsString({ message: 'Should be string' })
  tax: string;

  @ApiProperty({
    example: 1,
    description: 'Discount id',
  })
  @IsNumber({}, { message: 'Should be always number' })
  readonly discounts: number[];
}
