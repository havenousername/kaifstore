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
import { TimeLogger } from '../utils/logs/time-logger';

@Injectable()
export class ImportExportService {
  private currencies!: ResponseCurrenciesData;
  private readonly logger = new TimeLogger(ImportExportService.name);
  constructor(
    private productService: ProductsService,
    private productGroupsService: ProductGroupsService,
  ) {
    const currency = new CurrenciesService();
    currency.getCurrencies().then((data) => (this.currencies = data));
  }

  async importGroups(dto: CreateFromNameDto[]) {
    const results: string[] = [];
    for (const groupChunk of dto) {
      results.push(
        ...(await this.productGroupsService.createGroups(groupChunk)),
      );
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
      measurename: product?.measureName ?? undefined,
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
        await this.productGroupsService.getByName(dto.group, { all: true }),
      );
    const encodedName = new TextEncoder().encode(dto.name).join();
    const hasCached = groups && groups.has(encodedName);

    const group: ProductGroup = hasCached
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (groups!.get(encodedName) as ProductGroup)
      : await getGroup();

    if (groups && !hasCached && !groups.has(encodedName)) {
      groups.set(encodedName, group);
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
    toImportDto: () => Promise<
      (Omit<MakeImportDto, 'group'> & { group?: string })[]
    >,
  ): Promise<void> {
    const existingProducts = await this.productService.getProducts();
    const dto = await toImportDto();
    const noGroup = await this.productGroupsService.getNoGroup();
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
    this.logger.startTime(`Start importing ${dto.length} products`);
    const handle = await Promise.allSettled(
      dto.map(async (pr) => {
        const product = { ...pr, group: pr.group ? pr.group : noGroup.name };
        const existingProduct = await this.productService.getByUUID(
          product.uuid,
        );
        if (existingProduct) {
          await this.update(product, groups);
        } else {
          await this.importSingleProduct(product);
        }
      }),
    );
    this.logger.endTime('End importing products');
    for (const promise of handle) {
      if (promise.status === 'rejected') {
        throw new HttpException(
          `Could not import product. Error: ${promise.reason}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return;
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

  async import(dto: MakeImportDto[]): Promise<Product[]> {
    try {
      return await Promise.all(dto.map((p) => this.importSingleProduct(p)));
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
