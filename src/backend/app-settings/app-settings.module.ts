import { forwardRef, Module } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsController } from './app-settings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppSettings } from '../model/app-settings.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { MoyskladModule } from '../moysklad/moysklad.module';
import { ImportExportModule } from '../import-export/import-export.module';

@Module({
  providers: [AppSettingsService],
  controllers: [AppSettingsController],
  imports: [
    UsersModule,
    SequelizeModule.forFeature([AppSettings]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: { expiresIn: '24h' },
    }),
    forwardRef(() => MoyskladModule),
    ImportExportModule,
  ],
  exports: [AppSettingsService],
})
export class AppSettingsModule {}
