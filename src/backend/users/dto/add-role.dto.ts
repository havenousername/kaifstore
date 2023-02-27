import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class AddRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Name of role',
  })
  @IsString({ message: 'Admin be always string' })
  readonly name!: string;

  @ApiProperty({
    example: '1',
    description: 'Id of user',
  })
  @IsNumber({}, { message: 'Admin be always number' })
  readonly userId!: number;
}
