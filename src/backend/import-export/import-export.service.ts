import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MakeImportDto } from './dto/make-import.dto';
import { ProductsService } from '../products/products.service';
import { ProductGroupsService } from '../product-groups/product-groups.service';
import { ProductType } from '../interfaces/product-type.enum';
import { ProductGroup } from '../model/product-groups.model';
import { Product } from '../model/products.model';

@Injectable()
export class ImportExportService {
  constructor(
    private productService: ProductsService,
    private productGroupsService: ProductGroupsService,
  ) {}

  async import(
    dto: MakeImportDto[],
  ): Promise<{ groups: ProductGroup[]; products: Product[] }> {
    const products = dto.filter((i) => !i.group);
    const groups = dto.filter((i) => i.group);
    try {
      const createdGroups = await Promise.all(
        groups.map(
          async (group) =>
            await this.productGroupsService.create({
              uuid: group.uuid,
              groupId: group.parentUuid,
              description: group.description,
              code: group.code.toString(),
              name: group.name,
            }),
        ),
      );

      const createdProducts = await Promise.all(
        products.map(
          async (product) =>
            await this.productService.create(
              {
                uuid: product.uuid,
                name: product.name,
                price: product.price,
                costPrice: product.costPrice,
                groupId: product.parentUuid,
                description: product.description,
                code: product.code.toString(),
                productType:
                  product.type === 'NORMAL'
                    ? ProductType.NORMAL
                    : ProductType.TOBACCO_MARKED,
                tax: product.tax,
                allowToSell: product.allowToSell,
                characteristics: [],
                quantity: product.quantity,
                barCodes: product.barCodes,
                measureName: product.measureName,
                articleNumber: product.articleNumber,
                discounts: [],
              },
              [],
            ),
        ),
      );

      return { groups: createdGroups, products: createdProducts };
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
