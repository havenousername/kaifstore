import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppSettings } from '../model/app-settings.model';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { omit } from 'lodash';

@Injectable()
export class AppSettingsService {
  constructor(
    @InjectModel(AppSettings) private appSettingsRepository: typeof AppSettings,
  ) {}

  async getSettings(): Promise<AppSettings> {
    const settings = await this.appSettingsRepository.findOne({
      where: { id: 1 },
    });
    return {
      language: settings.getDataValue('language'),
      moyskladIntegration: settings.getDataValue('moyskladIntegration'),
      moyskladToken: settings.moyskladToken,
      moyskladSync: settings.getDataValue('moyskladSync'),
    } as unknown as AppSettings;
  }

  async updateSettings(dto: UpdateSettingsDto) {
    if (!dto.moyskladPassword) {
      dto = omit(dto, 'moyskladPassword');
    }

    if (!dto.moyskladEmail) {
      dto = omit(dto, 'moyskladEmail');
    }
    return await this.appSettingsRepository.update(
      { ...dto },
      { where: { id: 1 } },
    );
  }
}
