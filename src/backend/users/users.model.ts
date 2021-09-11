import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttributes {
  email: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;
}
