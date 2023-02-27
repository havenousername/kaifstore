import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  Unique,
  AllowNull,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './roles.model';
import { Gender } from 'src/backend/interfaces/gender.enum';
import { Address } from './addresses.model';

interface UserCreationAttributes {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  addressId: number;
  roleId: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id!: number;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email!: string;

  @ApiProperty({ example: '1234568', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @ApiProperty({
    example: Gender.FEMALE,
    description: 'Gender',
  })
  @Column({
    type: DataType.ENUM(Gender.MALE, Gender.FEMALE),
    allowNull: false,
  })
  gender!: Gender;

  @ApiProperty({
    example: 'Sun Sep 12 2000 21:45:11 GMT+0200 (Copenhagen Daylight Time)',
    description: 'Date of birth',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate!: Date;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1645215924910-9dc9a8b300c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    description: 'Photo url',
  })
  @Column({
    type: DataType.STRING,
  })
  photo!: string;

  @ApiProperty({
    example: 'Sun Sep 10 2021 21:45:11 GMT+0200 (Copenhagen Daylight Time)',
    description: 'Date of creation',
  })
  @Column({
    type: DataType.DATE,
  })
  createdAt!: Date;

  @ApiProperty({
    example: 'Sun Sep 12 2021 21:45:11 GMT+0200 (Copenhagen Daylight Time)',
    description: 'Date of update',
  })
  @Column({
    type: DataType.DATE,
  })
  updatedAt!: Date;

  @ApiProperty({
    example: '1',
    description: 'User role id',
  })
  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @ApiProperty({
    example: 1,
    description: 'Address id',
  })
  @ForeignKey(() => Address)
  @Unique
  @Column
  addressId!: number;

  @BelongsTo(() => Address)
  address!: Address;
}
