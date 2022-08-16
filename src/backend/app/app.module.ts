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
import { DiscountsModule } from '../discounts/discounts.module';
import { ImportExportModule } from '../import-export/import-export.module';
import { FilesModule } from '../files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PaginateModule } from 'nestjs-sequelize-paginate';
import { CurrenciesModule } from '../currencies/currencies.module';
import * as path from 'path';
import { MoyskladModule } from '../moysklad/moysklad.module';

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

const herokuConfig: () => SequelizeModuleOptions = () => ({
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
});

const isHeroku = !!process.env.DATABASE_URL;

const sequelizeOptions: SequelizeModuleOptions = isHeroku
  ? herokuConfig()
  : {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: models,
      autoLoadModels: true,
      logging: (sql, timing) => {
        if (
          process.env.NODE_ENV === 'production' ||
          process.env.SHOW_DBLOGS === 'false'
        ) {
          return;
        }
        console.error(sql, timing);
        console.log(process.env.DATABASE_URL);
      },
      retryAttempts: 1,
      // synchronize: true,
      // sync: { force: true },
    };

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot(sequelizeOptions),
    AuthModule,
    ImportExportModule,
    MoyskladModule,
    // data modules
    UsersModule,
    FavouriteModule,
    RolesModule,
    ProductGroupsModule,
    AddressesModule,
    ProductsModule,
    DiscountsModule,
    FilesModule,
    CurrenciesModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    PaginateModule.forRoot(),
  ],
  controllers: [],
})
export class AppModule {}
