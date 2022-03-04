import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsService } from './products.service';
import { Product } from '../model/products.model';
import { FilesModule } from '../files/files.module';
import { ProductGroupsModule } from '../product-groups/product-groups.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product]),
    FilesModule,
    ProductGroupsModule,
  ],
  exports: [],
})
export class ProductsModule {}
