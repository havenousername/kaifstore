import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MakeImportDto } from './dto/make-import.dto';
import { ProductsService } from '../products/products.service';
import { ProductGroupsService } from '../product-groups/product-groups.service';
import { CreateFromNameDto } from '../product-groups/dto/create-from-name.dto';
import countries from '../countries/countries';
import {
  CurrenciesService,
  ResponseCurrenciesData,
} from '../currencies/currencies.service';

@Injectable()
export class ImportExportService {
  private currencies: ResponseCurrenciesData;
  constructor(
    private productService: ProductsService,
    private productGroupsService: ProductGroupsService,
  ) {
    const currency = new CurrenciesService();
    currency.getCurrencies().then((data) => (this.currencies = data));
  }

  async importGroups(dto: CreateFromNameDto[]) {
    const results: string[] = [];
    for (const group of dto) {
      results.push(...(await this.productGroupsService.createGroups(group)));
    }
    return results;
  }

  async import(dto: MakeImportDto[]): Promise<boolean> {
    try {
      await Promise.all(
        dto.map(async (product) => {
          const group = await this.productGroupsService.getByName(
            product.group,
          );
          if (group.uuid === null) {
            console.error(group);
            throw new Error('No group for product');
          }
          return await this.productService.create(
            {
              uuid: product.uuid,
              name: product.name,
              price: product.price ?? 1000,
              costPrice: product.costPrice ?? 1000,
              groupId: group.uuid,
              description: product.description,
              code: product.code?.toString(),
              productType: product.productType,
              tax: product.tax,
              allowToSell: product.allowToSell,
              tags: [],
              quantity: product.quantity,
              barCodes: product.barCodes,
              measureName: product.measureName,
              articleNumber: product.articleNumber,
              discounts: [],
              attributes: product.attributes,
              country: product.country ?? countries.RU,
              currency:
                product.currency ?? Object.values(this.currencies.symbols)[0],
              discountProhibited: product.discountProhibited,
              useParentVat: product.useParentVat,
              variantsCount: product.variantsCount,
            },
            [],
          );
        }),
      );
      return true;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Products and groups provided, have either wrong order, or do not have acceptable type. ' +
          e.message,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
