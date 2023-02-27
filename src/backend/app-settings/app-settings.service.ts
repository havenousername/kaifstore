import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppSettings } from '../model/app-settings.model';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { omit } from 'lodash';
import { MoyskladService } from '../moysklad/moysklad.service';
import { encrypt } from '../utils/crypto';
import { ImportExportService } from '../import-export/import-export.service';
import { MoyskladProduct } from '../interfaces/moysklad-api-types';
import { CreateFromNameDto } from '../product-groups/dto/create-from-name.dto';
import { Product } from '../model/products.model';
import { MakeImportDto } from '../import-export/dto/make-import.dto';
import throwExceptionIfNull from '../utils/throw-exception-if-null';

@Injectable()
export class AppSettingsService {
  private readonly logger = new Logger(AppSettings.name);
  constructor(
    @InjectModel(AppSettings) private appSettingsRepository: typeof AppSettings,
    @Inject(forwardRef(() => MoyskladService))
    private readonly moyskladService: MoyskladService,
    @Inject(ImportExportService)
    private importExportService: ImportExportService,
  ) {}

  async getSettings(): Promise<
    AppSettings & { moyskladToken: string | undefined }
  > {
    const settings: AppSettings = throwExceptionIfNull(
      await this.appSettingsRepository.findOne(),
      'settings',
    );
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

  private async syncData(): Promise<Product[]> {
    const products = await this.moyskladService.getProducts();
    const prepareProducts =
      (products: MoyskladProduct[]) =>
      async (importGroups: (dto: CreateFromNameDto[]) => Promise<string[]>) => {
        const result: MakeImportDto[] = [];
        for (const product of products) {
          const d1 = new Date();
          this.logger.log(`Product with id ${product.id} will be imported now`);
          result.push(
            await this.moyskladService.toImportDto(product, importGroups),
          );
          const d2 = new Date();
          this.logger.log(
            `Product with id ${product.id} had been imported now`,
            [`Duration: ${d2.getTime() - d1.getTime()}`, AppSettings.name],
          );
        }
        return result;
      };
    return this.importExportService.synchronize(prepareProducts(products));
  }

  async changeSync() {
    const sync = await this.getSettings();
    if (sync.moyskladSync) {
      await this.moyskladService.deleteWebhooks();
    } else {
      await this.syncData();
      await this.moyskladService.createWebhooks();
    }
    await this.appSettingsRepository.update(
      { ...sync, moyskladSync: !sync.moyskladSync },
      { where: { id: 1 } },
    );

    return !sync.moyskladSync;
  }
}
