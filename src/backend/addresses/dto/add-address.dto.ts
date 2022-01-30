import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddAddressDto {
  @ApiProperty({ example: 'Moldova', description: 'Country name' })
  @IsString({ message: 'Should be always string' })
  readonly country: string;

  @ApiProperty({ example: 'Chisinau', description: 'Cities name' })
  @IsString({ message: 'Should be always string' })
  readonly city: string;

  @ApiProperty({ example: 'bd. Stefan cel Mare', description: 'Street name' })
  @IsString({ message: 'Should be always string' })
  readonly street: string;

  @ApiProperty({ example: 45, description: 'Street number' })
  @IsNumber({}, { message: 'Should be number' })
  readonly streetNumber: number;

  @ApiProperty({ example: 'MD-4500', description: 'Post number' })
  @IsString({ message: 'Should be always string' })
  readonly postNumber: string;

  @ApiProperty({
    example: 4,
    description: 'Apartment floor',
    required: false,
  })
  @IsNumber({}, { message: 'Should be number' })
  readonly apartmentFloor?: number;

  @ApiProperty({
    example: 'ring number 13',
    description: 'Apartment ring',
    required: false,
  })
  @IsString({ message: 'Should be always string' })
  readonly apartmentRing?: string;

  @ApiProperty({
    example: 'Please be aware that elevators do not work',
    description: 'Some remarks',
    required: false,
  })
  @IsString({ message: 'Should be always string' })
  readonly remarks?: string;
}
