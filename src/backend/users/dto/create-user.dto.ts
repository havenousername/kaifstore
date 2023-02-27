import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsValidGender } from '../../validation/gender.validation';
import { Gender } from '../../interfaces/gender.enum';
import { AddAddressDto } from '../../addresses/dto/add-address.dto';

export class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email',
  })
  @IsString({ message: 'Should be always string' })
  @IsEmail({}, { message: 'Incorrect email structure' })
  readonly email!: string;

  @ApiProperty({
    example: '1234568',
    description: 'Password',
  })
  @IsString({ message: 'Should be always string' })
  @Length(8, 16, {
    message: 'Password should contain more than 8 but less than 16 words',
  })
  readonly password!: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  @IsString({ message: 'Should be always string' })
  readonly firstName!: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  @IsString({ message: 'Should be always string' })
  readonly lastName!: string;

  @ApiProperty({
    example: Gender.FEMALE,
    description: 'Gender',
  })
  @IsValidGender({})
  readonly gender!: Gender;

  @ApiProperty({
    example: 'Sun Sep 12 2000 21:45:11 GMT+0200 (Copenhagen Daylight Time)',
    description: 'Date of birth',
  })
  @IsDateString({}, { message: 'Birthdate should have iso-string format' })
  readonly birthDate!: Date;

  @ApiProperty({
    example: 'country, city, etc...',
    description: 'Object of address',
  })
  @IsOptional({ always: true })
  @IsObject({ message: 'Address is not an object' })
  readonly address?: AddAddressDto;

  @ApiProperty({
    example: 1,
    description: 'Role id',
  })
  roleId?: number;
}
