import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSettingsDto {
  @ApiProperty({
    example: 'ru',
    description: 'Language of the application',
  })
  @IsString({ message: 'Should be always string' })
  readonly language: string;

  @ApiProperty({
    example: 'josh.doe@moysklad.com',
    description: 'Moysklad integration email',
  })
  @IsOptional({ message: 'Has the application an integration with moysklad' })
  readonly moyskladIntegration: boolean;

  @ApiProperty({
    example: 'josh.doe@moysklad.com',
    description: 'Moysklad integration email',
  })
  @IsOptional()
  @IsString({ message: 'Should be always string' })
  readonly moyskladEmail?: string;

  @ApiProperty({
    example: '********',
    description: 'Moysklad integration password',
  })
  @IsOptional()
  @IsString({ message: 'Should be always string' })
  readonly moyskladPassword?: string;
}
