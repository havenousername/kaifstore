import { Column, DataType, Default, Model } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export class AppSettings extends Model<AppSettings> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({ example: 'ru', description: 'Language of application' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  language: string;

  @ApiProperty({
    example: true,
    description: 'Is there an integration of a storage system',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  @Default(false)
  moyskladIntegration: boolean;

  @Column({
    type: DataType.STRING,
  })
  private moyskladEmail?: string;

  @Column({
    type: DataType.STRING,
  })
  private moyskladPassword?: string;

  get moyskladToken(): string | undefined {
    if (!this.moyskladEmail || !this.moyskladPassword) {
      return;
    }
    return Buffer.from(
      `${this.moyskladEmail}:${this.moyskladPassword}`,
    ).toString();
  }
}
