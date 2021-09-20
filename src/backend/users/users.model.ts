import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Gender } from './interfaces/gender';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';

interface UserCreationAttributes {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
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
  id: number;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '1234568', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({
    example: Gender.FEMALE,
    description: 'Gender',
  })
  @Column({
    type: DataType.ENUM(Gender.MALE, Gender.FEMALE),
    allowNull: false,
  })
  gender: Gender;

  @ApiProperty({
    example: 'Sun Sep 12 2000 21:45:11 GMT+0200 (Copenhagen Daylight Time)',
    description: 'Date of birth',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate: Date;

  @ApiProperty({
    example: 'Sun Sep 10 2021 21:45:11 GMT+0200 (Copenhagen Daylight Time)',
    description: 'Date of creation',
  })
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @ApiProperty({
    example: 'Sun Sep 12 2021 21:45:11 GMT+0200 (Copenhagen Daylight Time)',
    description: 'Date of update',
  })
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @ApiProperty({
    example: '1',
    description: 'User role id',
  })
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}
