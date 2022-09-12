import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { decrypt } from '../app/crypto';

@Table({ tableName: 'app-settings' })
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
  moyskladIntegration: boolean;

  @Column({
    type: DataType.STRING,
  })
  moyskladEmail?: string;

  @Column({
    type: DataType.STRING,
  })
  moyskladPassword?: string;

  @Column({
    type: DataType.STRING,
  })
  moyskladAccessToken?: string;

  moyskladToken(): Promise<string | undefined> {
    if (!this.moyskladEmail || !this.moyskladPassword) {
      return;
    }
    return new Promise<string | undefined>((resolve, reject) => {
      return decrypt(this.moyskladPassword)
        .then((password) => {
          return resolve(
            Buffer.from(`${this.moyskladEmail}:${password}`).toString('base64'),
          );
        })
        .catch((e) => reject(e));
    });
  }

  @Column({
    type: DataType.BOOLEAN,
  })
  moyskladSync?: boolean;
}
