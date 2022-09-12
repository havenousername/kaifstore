import { forwardRef, Module } from '@nestjs/common';
import { MoyskladService } from './moysklad.service';
import { MoyskladController } from './moysklad.controller';
import { AppSettingsModule } from '../app-settings/app-settings.module';
import { MoyskladWebhookService } from './moysklad.webhook.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoyskladWebhook } from '../model/moysklad-webhook.model';

@Module({
  providers: [MoyskladService, MoyskladWebhookService],
  imports: [
    forwardRef(() => AppSettingsModule),
    SequelizeModule.forFeature([MoyskladWebhook]),
  ],
  exports: [MoyskladService],
  controllers: [MoyskladController],
})
export class MoyskladModule {}
