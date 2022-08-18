import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../../interfaces/gender.enum';
import { IsValidGender } from '../../validation/gender.validation';
import { AddAddressDto } from '../../addresses/dto/add-address.dto';

export class UpdateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email',
  })
  @IsOptional({ always: true })
  @IsString({ message: 'Should be always string' })
  @IsEmail({}, { message: 'Incorrect email structure' })
  readonly email?: string;

  @ApiProperty({
    example: '1234568',
    description: 'Password',
  })
  @IsOptional({ always: true })
  @IsString({ message: 'Should be always string' })
  readonly password?: string;

  @ApiProperty({
    example: '1234568',
    description: 'Password',
  })
  @IsOptional({ always: true })
  @IsString({ message: 'Should be always string' })
  readonly confirmPassword?: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  @IsOptional({ always: true })
  @IsString({ message: 'Should be always string' })
  readonly firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  @IsOptional({ always: true })
  @IsString({ message: 'Should be always string' })
  readonly lastName?: string;

  @ApiProperty({
    example: Gender.FEMALE,
    description: 'Gender',
  })
  @IsOptional({ always: true })
  @IsValidGender({})
  readonly gender?: Gender;

  @ApiProperty({
    example: 'Sun Sep 12 2000 21:45:11 GMT+0200 (Copenhagen Daylight Time)',
    description: 'Date of birth',
  })
  @IsOptional({ always: true })
  @IsDateString({}, { message: 'Birthdate should have iso-string format' })
  readonly birthDate?: Date;

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
  @IsOptional({ always: true })
  roleId?: number;

  @ApiProperty({
    example: 2,
    description: 'Address id',
  })
  @IsOptional({ always: true })
  @IsNumber({}, { message: 'Address id is not number' })
  readonly addressId?: number;
}
