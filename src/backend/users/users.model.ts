import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Gender } from './interfaces/gender';

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.ENUM(Gender.MALE, Gender.FEMALE),
    allowNull: false,
  })
  gender: Gender;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate: Date;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;
}
