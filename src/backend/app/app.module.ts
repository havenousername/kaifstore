import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { User } from '../model/users.model';
import { ConfigModule } from '@nestjs/config';
import { FavouriteModule } from '../favourite/favourite.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../model/roles.model';
import { Address } from '../model/addresses.model';

const sequelizeOptions: SequelizeModuleOptions = process.env.DATABASE_URL
  ? {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Role, Address],
      autoLoadModels: true,
      // synchronize: true,
      // sync: { force: true },
    }
  : {
      dialect: 'postgres',
      protocol: 'postgres',
      host: process.env.DATABASE_URL,
      dialectOptions: {
        ssl: true,
      },
    };

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot(sequelizeOptions),
    UsersModule,
    FavouriteModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [],
})
export class AppModule {}
