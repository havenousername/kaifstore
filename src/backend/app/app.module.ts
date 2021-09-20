import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.model';
import { ConfigModule } from '@nestjs/config';
import { FavouriteModule } from '../favourite/favourite.module';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../roles/roles.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Role],
      autoLoadModels: true,
      // synchronize: true,
      // sync: { force: true },
    }),
    UsersModule,
    FavouriteModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [],
})
export class AppModule {}
