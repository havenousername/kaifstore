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
import { ProductGroup } from '../model/product-groups.model';
import { Product } from '../model/products.model';
import { differenceWith } from 'lodash';
import throwExceptionIfNull from '../utils/throw-exception-if-null';

@Injectable()
export class ImportExportService {
  private currencies!: ResponseCurrenciesData;
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
      tax: product.tax ?? '',
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

  async update(dto: MakeImportDto, groups?: Map<string, ProductGroup>) {
    const getGroup = async () =>
      throwExceptionIfNull(
        await this.productGroupsService.getByName(dto.group),
      );
    const hasCached = groups && groups.has(dto.name);

    const group: ProductGroup = hasCached
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (groups!.get(dto.name) as ProductGroup)
      : await getGroup();

    if (groups && !hasCached) {
      groups.set(dto.name, group);
    }

    if (groups && group.uuid === null) {
      throw new HttpException('No group for product', HttpStatus.NOT_FOUND);
    }
    const oldProduct = throwExceptionIfNull(
      await this.productService.getByUUID(dto.uuid),
    );
    return await this.productService.update(
      { ...this.prepareProduct(dto, group.uuid), id: oldProduct.id },
      [],
      dto.images ?? [],
    );
  }

  async synchronize(
    toImportDto: (
      importGroups: (dto: CreateFromNameDto[]) => Promise<string[]>,
    ) => Promise<MakeImportDto[]>,
  ): Promise<Product[]> {
    const existingProducts = await this.productService.getProducts();
    const dto = await toImportDto(this.importGroups.bind(this));
    const unSyncProducts = differenceWith(
      existingProducts,
      dto,
      (p1, p2) => p1.uuid !== p2.uuid,
    );
    try {
      await this.productService.deleteMultiple(unSyncProducts.map((p) => p.id));
    } catch (e) {
      throw new HttpException(
        `Can not delete some of the unSync products, ${unSyncProducts.map(
          (i) => i.id,
        )}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const groups: Map<string, ProductGroup> = new Map<string, ProductGroup>();
    return Promise.all(
      dto.map(async (product) => {
        const existingProduct = await this.productService.getByUUID(
          product.uuid,
        );
        if (existingProduct) {
          const updated = await this.update(product, groups);
          if (updated.length === 1) {
            return existingProduct;
          } else {
            return updated[1][0];
          }
        } else {
          return this.importSingleProduct(product);
        }
      }),
    );
  }

  private async importSingleProduct(product: MakeImportDto): Promise<Product> {
    const group = await this.productGroupsService.getByName(product.group);
    if (group && group.uuid === null) {
      console.error(group);
      throw new HttpException('No group for product', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const uuid = group!.uuid;
    return await this.productService.create(
      this.prepareProduct(product, uuid),
      [],
      product.images ?? [],
    );
  }

  async import(dto: MakeImportDto[]): Promise<boolean> {
    try {
      await Promise.all(dto.map(this.importSingleProduct));
      return true;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Products and groups provided, have either wrong order, or do not have acceptable type.' +
        (e as { message: string }).message
          ? (e as { message: string }).message
          : '',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
