import { Gender } from '../interfaces/gender';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email',
  })
  readonly email: string;

  @ApiProperty({
    example: '1234568',
    description: 'Password',
  })
  readonly password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  readonly lastName: string;

  @ApiProperty({
    example: Gender.FEMALE,
    description: 'Gender',
  })
  readonly gender: Gender;

  @ApiProperty({
    example: 'Sun Sep 12 2000 21:45:11 GMT+0200 (Copenhagen Daylight Time)',
    description: 'Date of birth',
  })
  readonly birthDate: Date;

  @ApiProperty({
    example: 'Admin',
    description: 'Role of user',
  })
  readonly role: string;
}
