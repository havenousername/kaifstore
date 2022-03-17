import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'Hookah', description: 'Group name' })
  @IsString({ message: 'Should be always string' })
  readonly name: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-42661417400a',
    description: 'Uuid',
  })
  @IsUUID('all', { message: 'Should be always string' })
  uuid: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Group id',
  })
  @IsUUID('all', { message: 'Should be always uuid' })
  readonly groupId?: string;

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
}
