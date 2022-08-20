import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppSettings } from '../model/app-settings.model';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class AppSettingsService {
  constructor(
    @InjectModel(AppSettings) private appSettingsRepository: typeof AppSettings,
  ) {}

  async getSettings(): Promise<AppSettings> {
    return this.appSettingsRepository.findOne({ where: { id: 1 } });
  }

  async updateSettings(dto: UpdateSettingsDto) {
    return this.appSettingsRepository.update({ ...dto }, { where: { id: 1 } });
  }
}
