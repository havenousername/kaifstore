import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface AddressCreateAttributes {
  country: string;
  city: string;
  street: string;
  streetNumber: number;
  postNumber: string;
  apartmentFloor?: number;
  apartmentRing?: string;
  remarks?: string;
}

@Table({ tableName: 'addresses' })
export class Address extends Model<Address, AddressCreateAttributes> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({ example: 'Moldova', description: 'Country name' })
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  country: string;

  @ApiProperty({ example: 'Chisinau', description: 'Cities name' })
  @Column({
    type: DataType.STRING(256),
    allowNull: false,
  })
  city: string;

  @ApiProperty({ example: 'bd. Stefan cel Mare', description: 'Street name' })
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  street: string;

  @ApiProperty({ example: '45', description: 'Street number' })
  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  streetNumber: number;

  @ApiProperty({ example: 'MD-4500', description: 'Post number' })
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  postNumber: string;

  @ApiProperty({
    example: '4',
    description: 'Apartment floor',
    required: false,
  })
  @Column({
    type: DataType.SMALLINT,
  })
  apartmentFloor?: number;

  @ApiProperty({
    example: 'ring number 13',
    description: 'Apartment ring',
    required: false,
  })
  @Column({
    type: DataType.STRING,
  })
  apartmentRing?: string;

  @ApiProperty({
    example: 'Please be aware that elevators do not work',
    description: 'Some remarks',
    required: false,
  })
  @Column({
    type: DataType.STRING,
  })
  remarks?: string;
}
