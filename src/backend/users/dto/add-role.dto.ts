import { ApiProperty } from '@nestjs/swagger';

export default class AddRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Name of role',
  })
  readonly name: string;

  @ApiProperty({
    example: '1',
    description: 'Id of user',
  })
  readonly userId: number;
}
