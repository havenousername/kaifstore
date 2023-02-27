import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFromNameDto {
  @ApiProperty({ example: 'Hookah', description: 'Group name' })
  @IsString({ message: 'Should be always string' })
  readonly name!: string;
}
