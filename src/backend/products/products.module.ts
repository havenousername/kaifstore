import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { Product } from '../model/products.model';
import { FilesModule } from '../files/files.module';
import { ProductGroupsModule } from '../product-groups/product-groups.module';
import { ProductDiscount } from '../model/product-discounts.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product, ProductDiscount]),
    FilesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule,
    forwardRef(() => ProductGroupsModule),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
