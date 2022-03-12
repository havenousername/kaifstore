import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EditProductDto extends CreateProductDto {
  @ApiProperty({
    example: '1',
    description: 'Product name',
  })
  @IsNumber({}, { message: 'Should be always number' })
  readonly id: number;

  @ApiProperty({
    example: 1,
    description: 'Discount id',
  })
  @IsNumber({}, { message: 'Should be always number' })
  readonly discounts: number[];
}
