import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { ProductMeasure } from '../../interfaces/product-measure.enum';

export class MakeImportDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-42661417400a',
    description: 'Uuid',
  })
  @IsUUID('all', { message: 'Should be always string' })
  uuid: string;

  @ApiProperty({
    example: 'Product',
    description: 'Name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Group',
    description: 'Is group or product',
  })
  @IsBoolean()
  group: boolean;

  @ApiProperty({
    example: 34,
    description: 'Product price',
  })
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: 23,
    description: 'Product cost price',
  })
  @IsNumber()
  costPrice?: number;

  @ApiProperty({
    example: 190,
    description: 'Product quantity',
  })
  @IsNumber()
  quantity?: number;

  @ApiProperty({
    example: 190,
    description: '123e4567-e89b-12d3-a456-42661417400a',
  })
  @IsUUID('all')
  parentUuid?: string;

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
    example: 'This is description of the product',
    description: 'Description',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: 91222,
    description: 'Article Number',
  })
  @IsString()
  articleNumber?: number;

  @ApiProperty({
    example: 'NO_VAT',
    description: 'Tax',
  })
  @IsString()
  tax?: string;

  @ApiProperty({
    example: 'NORMAL',
    description: 'Type',
  })
  @IsString()
  type?: string;

  @ApiProperty({
    examples: ['barcode1', 'barcode2'],
    description: 'Type',
  })
  @IsArray()
  barCodes?: string[];
}
