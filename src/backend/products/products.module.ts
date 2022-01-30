import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductGroup } from '../model/product-groups.model';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([ProductGroup])],
  exports: [],
})
export class ProductGroupsModule {}
