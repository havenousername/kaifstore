import { ApiProperty } from '@nestjs/swagger';

export default class CreateRoleDto {
  @ApiProperty({
    example: 'Admin',
    description: 'Name of new role',
  })
  readonly name!: string;

  @ApiProperty({
    example: 'This is the person who has full control on application functions',
    description: 'Description of new role',
  })
  readonly description!: string;
}
