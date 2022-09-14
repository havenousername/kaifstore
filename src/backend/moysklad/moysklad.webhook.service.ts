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
import { ProductType } from '../interfaces/product-type.enum';

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
    const groupUUID = await this.importExport.importGroups([
      { name: product.pathName },
    ]);
    const groupName = (await this.groupsService.getByUuid(groupUUID[0])).name;

    const uomId = MoyskladWebhookService.strLast(product.uom.meta.href);
    const uomMeasure = await this.moyskladService.getUom(uomId);

    const currencyId = MoyskladWebhookService.strLast(
      product.salePrices[0].currency.meta.href,
    );
    const currency = await this.moyskladService.getCurrency(currencyId);

    const imageId = product.images.meta.href.split('/').at(-2);
    const imageResponse = await this.moyskladService.getImages(imageId);
    const bearer = await this.moyskladService.getBearer();

    return {
      uuid: product.id,
      name: product.name,
      group: groupName,
      price: product.salePrices[0].value / 100,
      costPrice: product.buyPrice.value / 100,
      description: product.description,
      code: !isNaN(+product.code) ? +product.code : 0,
      productType: ProductType[product.trackingType],
      tax: product.taxSystem,
      allowToSell: !product.archived,
      quantity: product.volume,
      barCodes: product.barcodes.map((b) => b.ean13),
      measureName: uomMeasure.name,
      articleNumber: !isNaN(+product.article) ? +product.article : 0,
      attributes: product.attributes
        ? product.attributes.map((a) => ({ name: a.type, value: a.name }))
        : [],
      country: product.country,
      currency: currency.name,
      discountProhibited: product.discountProhibited,
      useParentVat: product.useParentVat,
      variantsCount: product.variantsCount,
      images: imageResponse.rows.map((r) => ({
        url: r.miniature.href,
        name: r.filename,
        type: r.miniature.mediaType,
        bearer,
      })),
    };
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
