import { Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class MoyskladWebhookService {
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

  public static strLast(array: string) {
    return array.split('/').at(-1);
  }

  private async prepareProduct(event: MoyskladEvent): Promise<MakeImportDto> {
    const eventId = MoyskladWebhookService.strLast(event.meta.href);
    const product = await this.moyskladService.getProduct(eventId);
    return await this.moyskladService.toImportDto(
      product,
      this.importExport.importGroups,
      this.groupsService.getByUuid,
    );
  }

  public async [WebhookAction.CREATE](event: MoyskladEvent) {
    const product = await this.prepareProduct(event);
    return await this.importExport.import([product]);
  }

  public async [WebhookAction.UPDATE](event: MoyskladEvent) {
    const product = await this.prepareProduct(event);
    return await this.importExport.update(product);
  }

  public async [WebhookAction.DELETE](event: MoyskladEvent) {
    const eventId = MoyskladWebhookService.strLast(event.meta.href);
    return await this.productsService.deleteFromUUID(eventId);
  }
}
