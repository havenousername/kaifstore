import { Module } from '@nestjs/common';
import { ImportExportService } from './import-export.service';
import { ImportExportController } from './import-export.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { ProductGroupsModule } from '../product-groups/product-groups.module';

@Module({
  providers: [ImportExportService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule,
    ProductsModule,
    ProductGroupsModule,
  ],
  controllers: [ImportExportController],
  exports: [ImportExportService],
})
export class ImportExportModule {}
