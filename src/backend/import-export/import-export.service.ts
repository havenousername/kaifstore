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
import { ProductPipe } from '../pipes/product.pipe';
import { CreateProductDto } from '../products/dto/create-product.dto';

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

  private prepareProduct(
    product: MakeImportDto,
    groupId: string,
  ): CreateProductDto {
    return {
      uuid: product.uuid,
      name: product.name,
      price: product.price ?? 1000,
      costPrice: product.costPrice ?? 1000,
      groupId: groupId,
      description: product.description,
      code: product.code?.toString(),
      productType: product.productType,
      tax: product.tax,
      allowToSell: product.allowToSell,
      tags: [],
      quantity: product.quantity,
      barCodes: product.barCodes,
      measurename: product.measureName
        ? ProductPipe.prepareMeasureName(product.measureName)
        : undefined,
      articleNumber: product.articleNumber,
      discounts: [],
      attributes: product.attributes
        ? ProductPipe.prepareAttributes(product.attributes)
        : [],
      country: product.country ?? countries.RU,
      currency: product.currency ?? Object.values(this.currencies.symbols)[0],
      discountProhibited: product.discountProhibited,
      useParentVat: product.useParentVat,
      variantsCount: product.variantsCount,
    };
  }

  async update(dto: MakeImportDto) {
    const group = await this.productGroupsService.getByName(dto.group);
    if (group.uuid === null) {
      console.error(group);
      throw new Error('No group for product');
    }
    const oldProduct = await this.productService.getByUUID(dto.uuid);
    return await this.productService.update(
      { ...this.prepareProduct(dto, group.uuid), id: oldProduct.id },
      [],
      dto.images,
    );
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
            this.prepareProduct(product, group.uuid),
            [],
            product.images,
          );
        }),
      );
      return true;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Products and groups provided, have either wrong order, or do not have acceptable type.' +
          e.message,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
