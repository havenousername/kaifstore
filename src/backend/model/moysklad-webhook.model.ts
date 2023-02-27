import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface MoyskladWebhookAttributes {
  action: string;
  url: string;
  uuid: string;
}

@Table({ tableName: 'webhooks' })
export class MoyskladWebhook extends Model<
  MoyskladWebhook,
  MoyskladWebhookAttributes
> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id!: number;

  @ApiProperty({
    example: '7944ef04-f831-11e5-7a69-971500188b19',
    description: 'UUID from server',
  })
  @Column({
    type: DataType.STRING,
  })
  uuid!: string;

  @ApiProperty({ example: 'UPDATE', description: 'action of webhook' })
  @Column({
    type: DataType.STRING,
  })
  action!: string;

  @ApiProperty({ example: 'https://google.com', description: 'url of webhook' })
  @Column({
    type: DataType.STRING,
  })
  url!: string;
}
