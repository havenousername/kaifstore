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
import { ProductGroup } from '../model/product-groups.model';
import { ProductGroupsModule } from '../product-groups/product-groups.module';
import { Product } from '../model/products.model';
import { AddressesModule } from '../addresses/addresses.module';
import { ProductDiscount } from '../model/product-discounts.model';
import { Discount } from '../model/discounts.model';
import { AlcoholProduct } from '../model/alcohol-products.model';
import { ProductsModule } from '../products/products.module';

const models = [
  User,
  Role,
  Address,
  ProductGroup,
  Product,
  Address,
  Discount,
  ProductDiscount,
  AlcoholProduct,
];

const sequelizeOptions: SequelizeModuleOptions = !process.env.DATABASE_URL
  ? {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: models,
      autoLoadModels: true,
      // synchronize: true,
      // sync: { force: true },
    }
  : {
      dialect: 'postgres',
      host: process.env.DATABASE_URL.split('@')[1].split(':')[0],
      port: +process.env.DATABASE_URL.split('@')[1].split(':')[1].split('/')[0],
      username: process.env.DATABASE_URL.split('//')[1].split(':')[0],
      password: process.env.DATABASE_URL.split(':')[2].split('@')[0],
      database: process.env.DATABASE_URL.split('/')[3],
      models: models,
      autoLoadModels: true,
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot(sequelizeOptions),
    AuthModule,
    // data modules
    UsersModule,
    FavouriteModule,
    RolesModule,
    ProductGroupsModule,
    AddressesModule,
    ProductsModule,
  ],
  controllers: [],
})
export class AppModule {}
