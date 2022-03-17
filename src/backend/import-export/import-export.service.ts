import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MakeImportDto } from './dto/make-import.dto';
import { ProductsService } from '../products/products.service';
import { ProductGroupsService } from '../product-groups/product-groups.service';
import { ProductType } from '../interfaces/product-type.enum';

@Injectable()
export class ImportExportService {
  constructor(
    private productService: ProductsService,
    private productGroupsService: ProductGroupsService,
  ) {}

  async import(dto: MakeImportDto[]): Promise<boolean> {
    const products = dto.filter((i) => !i.group);
    const groups = dto.filter((i) => i.group);
    try {
      let groupPromise = this.productGroupsService.create({
        uuid: groups[0].uuid,
        groupId: groups[0].parentUuid,
        description: groups[0].description,
        code: groups[0].code.toString(),
        name: groups[0].name,
      });
      for (let i = 1; i < groups.length; i++) {
        groupPromise = groupPromise.then(() =>
          this.productGroupsService.create({
            uuid: groups[i].uuid,
            groupId: groups[i].parentUuid,
            description: groups[i].description,
            code: groups[i].code.toString(),
            name: groups[i].name,
          }),
        );
      }

      await groupPromise.then(
        async () =>
          await Promise.all(
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
          ),
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
