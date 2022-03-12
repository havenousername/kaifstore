import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { EditProductDto } from '../products/dto/edit-product.dto';
import { ProductMeasure } from '../interfaces/product-measure.enum';

@Injectable()
export class ProductPipe implements PipeTransform<unknown> {
  transform(
    value: Record<keyof EditProductDto, any>,
  ): CreateProductDto | EditProductDto {
    return {
      description: value.description ? String(value.description) : '',
      allowToSell: Boolean(value.allowToSell),
      articleNumber: value.articleNumber
        ? Number(value.articleNumber)
        : undefined,
      barCodes: JSON.parse(value.barCodes),
      code: value.code ? String(value.code) : undefined,
      productType: value.code ? +value.productType : undefined,
      quantity: value.quantity ? +value.quantity : undefined,
      characteristics: JSON.parse(value.characteristics),
      price: +value.price,
      costPrice: +value.costPrice,
      discounts: value.discounts ? JSON.parse(value.discounts) : undefined,
      groupId: value.groupId,
      id: +value.id ? +value.id : undefined,
      measureName: String(value.measureName) as ProductMeasure,
      name: String(value.name),
      tax: value.tax,
    };
  }
}
