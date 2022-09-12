import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppSettings } from '../model/app-settings.model';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { omit } from 'lodash';
import { MoyskladService } from '../moysklad/moysklad.service';
import { encrypt } from '../app/crypto';

@Injectable()
export class AppSettingsService {
  constructor(
    @InjectModel(AppSettings) private appSettingsRepository: typeof AppSettings,
    @Inject(forwardRef(() => MoyskladService))
    private readonly moyskladService: MoyskladService,
  ) {}

  async getSettings(): Promise<
    AppSettings & { moyskladToken: string | undefined }
  > {
    const settings: AppSettings = await this.appSettingsRepository.findOne();
    const token = await settings.moyskladToken();
    return {
      language: settings.getDataValue('language'),
      moyskladIntegration: settings.getDataValue('moyskladIntegration'),
      moyskladToken: token,
      moyskladSync: settings.getDataValue('moyskladSync'),
      moyskladAccessToken: settings.getDataValue('moyskladAccessToken'),
    } as unknown as AppSettings & { moyskladToken: string | undefined };
  }

  async resetSettings() {
    const settings = await this.getSettings();
    if (settings.moyskladSync) {
      await this.moyskladService.deleteWebhooks();
    }
    return await this.appSettingsRepository.update(
      {
        moyskladIntegration: false,
        moyskladSync: false,
        moyskladEmail: '',
        moyskladPassword: '',
      },
      { where: { id: 1 } },
    );
  }

  async updateSettings(dto: UpdateSettingsDto) {
    if (!dto.moyskladIntegration) {
      return await this.resetSettings();
    }

    if (!dto.moyskladPassword) {
      dto = omit(dto, 'moyskladPassword');
    }

    if (!dto.moyskladEmail) {
      dto = omit(dto, 'moyskladEmail');
    }
    const data = await this.appSettingsRepository.update(
      {
        ...dto,
        moyskladPassword: dto.moyskladPassword
          ? await encrypt(dto.moyskladPassword)
          : '',
      },
      { where: { id: 1 } },
    );

    if (dto.moyskladEmail && dto.moyskladPassword) {
      try {
        const bearer = await this.moyskladService.generateBearer();
        await this.appSettingsRepository.update(
          { moyskladAccessToken: bearer },
          { where: { id: 1 } },
        );
      } catch (e) {
        await this.resetSettings();
        throw e;
      }
    }

    return data;
  }

  async changeSync() {
    const sync = await this.getSettings();
    if (sync.moyskladSync) {
      await this.moyskladService.deleteWebhooks();
    } else {
      await this.moyskladService.createWebhooks();
    }
    await this.appSettingsRepository.update(
      { ...sync, moyskladSync: !sync.moyskladSync },
      { where: { id: 1 } },
    );
  }
}
