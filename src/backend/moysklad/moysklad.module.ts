import { forwardRef, Module } from '@nestjs/common';
import { MoyskladService } from './moysklad.service';
import { MoyskladController } from './moysklad.controller';
import { AppSettingsModule } from '../app-settings/app-settings.module';
import { MoyskladWebhookService } from './moysklad.webhook.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoyskladWebhook } from '../model/moysklad-webhook.model';
import { ProductsModule } from '../products/products.module';
import { ImportExportModule } from '../import-export/import-export.module';
import { ProductGroupsModule } from '../product-groups/product-groups.module';

@Module({
  providers: [MoyskladService, MoyskladWebhookService],
  imports: [
    forwardRef(() => AppSettingsModule),
    ProductsModule,
    ImportExportModule,
    ProductGroupsModule,
    SequelizeModule.forFeature([MoyskladWebhook]),
  ],
  exports: [MoyskladService],
  controllers: [MoyskladController],
})
export class MoyskladModule {}
