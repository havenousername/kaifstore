import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { EditProductDto } from '../products/dto/edit-product.dto';
import { ProductMeasure } from '../interfaces/product-measure.enum';
import { Attributes } from '../interfaces/attributes';
import { ProductType } from '../interfaces/product-type.enum';

@Injectable()
export class ProductPipe implements PipeTransform<unknown> {
  transform(
    value: Record<keyof EditProductDto, any>,
  ): CreateProductDto | EditProductDto {
    return {
      description: value.description ? String(value.description) : '',
      allowToSell: Boolean(value.allowToSell),
      articleNumber: !isNaN(+value.articleNumber)
        ? Number(value.articleNumber)
        : undefined,
      barCodes: JSON.parse(value.barCodes),
      code: value.code ? String(value.code) : undefined,
      productType: !isNaN(value.productType)
        ? (+value.productType as ProductType)
        : 0,
      quantity: !isNaN(value.quantity) ? +value.quantity : undefined,
      tags: value.tags ? JSON.parse(value.tags) : undefined,
      price: +value.price,
      costPrice: isNaN(+value.costPrice) ? 0 : +value.costPrice,
      discounts: value.discounts ? JSON.parse(value.discounts) : undefined,
      groupId: value.groupId,
      id: +value.id ? +value.id : 0,
      measurename: value.measurename
        ? ProductPipe.prepareMeasureName(value.measurename)
        : undefined,
      name: value.name ? String(value.name) : '',
      tax: value.tax,
      discountProhibited: value.discountProhibited ?? false,
      attributes: value.attributes
        ? ProductPipe.prepareAttributes(value.attributes)
        : [],
      country: value.country,
      currency: value.currency,
      variantsCount: value.variantsCount,
      useParentVat: value.useParentVat,
    };
  }

  static prepareAttributes(attribs: Attributes[]): string[] {
    return attribs.map((a) => `${a.name}:${a.value}`);
  }

  static prepareMeasureName(name: ProductMeasure): keyof typeof ProductMeasure {
    return (
      Object.entries(ProductMeasure).find((j) => {
        return name === j[1];
      }) as [keyof typeof ProductMeasure, string]
    )[0];
  }
}
