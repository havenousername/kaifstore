import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  MoyskladEvent,
  MoyskladWebhook,
  WebhookAction,
} from '../interfaces/moysklad-api-types';
import { MoyskladService } from './moysklad.service';
import { ImportExportService } from '../import-export/import-export.service';
import { ProductGroupsService } from '../product-groups/product-groups.service';
import { ProductsService } from '../products/products.service';
import { MakeImportDto } from '../import-export/dto/make-import.dto';
import { ProductGroup } from '../model/product-groups.model';

@Injectable()
export class MoyskladWebhookService {
  private logger = new Logger(MoyskladWebhookService.name);
  private noGroup: ProductGroup | null = null;
  constructor(
    @Inject(MoyskladService)
    private readonly moyskladService: MoyskladService,
    @Inject(ImportExportService)
    private readonly importExport: ImportExportService,
    @Inject(ProductGroupsService)
    private readonly groupsService: ProductGroupsService,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
  ) {}

  public productChanged(dto: MoyskladWebhook) {
    for (const event of dto.events) {
      this[event.action](event);
    }
  }

  private async getNoProductGroup() {
    if (!this.noGroup) {
      this.noGroup = await this.groupsService.getNoGroup();
    }
    return this.noGroup;
  }

  public static strLast(array: string) {
    return array.split('/').at(-1);
  }

  private async prepareProduct(event: MoyskladEvent): Promise<MakeImportDto> {
    const eventId = MoyskladWebhookService.strLast(event.meta.href);
    const product = await this.moyskladService.getProduct(eventId ?? '');
    const dtoImported = await this.moyskladService.toImportDto(product);
    return {
      ...dtoImported,
      group: dtoImported?.group
        ? dtoImported.group
        : (await this.getNoProductGroup()).name,
    };
  }

  public async [WebhookAction.CREATE](event: MoyskladEvent) {
    this.logger.log(
      `[MOYSKLAD][CREATE] product event ${event.meta.href} was fired`,
    );
    const product = await this.prepareProduct(event);
    const imported = await this.importExport.import([product]);
    this.logger.log(`[MOYSKLAD][CREATE] product ${imported[0].id} was created`);
    return imported;
  }

  public async [WebhookAction.UPDATE](event: MoyskladEvent) {
    this.logger.log(
      `[MOYSKLAD][UPDATE] product event ${event.meta.href} was fired`,
    );
    const product = await this.prepareProduct(event);
    const updated = await this.importExport.update(product);
    this.logger.log(`[MOYSKLAD][UPDATE] product ${updated[0]} was updated`);
  }

  public async [WebhookAction.DELETE](event: MoyskladEvent) {
    this.logger.log(
      `[MOYSKLAD][DELETE] product event ${event.meta.href} was fired`,
    );
    let eventId = MoyskladWebhookService.strLast(event.meta.href);
    if (!eventId) {
      eventId = '';
    }
    const id = await this.productsService.deleteFromUUID(eventId);
    this.logger.log(`[MOYSKLAD][DELETE] product ${id} was updated`);
    return id;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async [WebhookAction.PROCESSED]() {}
}
