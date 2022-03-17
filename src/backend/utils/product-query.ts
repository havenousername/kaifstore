import { isNumber } from 'class-validator';
import { CustomQueries, CustomQueryKey } from '../interfaces/query';
import { HttpException, HttpStatus } from '@nestjs/common';
import { isString } from './type-checkers';

export type ProductQuery =
  | 'priceRange'
  | 'q'
  | 'groupId'
  | 'characteristics'
  | 'discount';

export const productQuerySelect = (
  query: unknown,
): Record<ProductQuery, any> => {
  return {
    priceRange: query['priceRange'],
    q: query['q'],
    groupId: query['groupId'],
    characteristics: query['characteristics'],
    discount: query['discount'],
  };
};

export const productQueryToArray = (
  query: CustomQueries<ProductQuery>,
  value: Record<CustomQueryKey<ProductQuery>, any>,
): CustomQueries<ProductQuery> => {
  if (value.q) {
    query.q = String(decodeURI(value.q));
  }
  if (isString(value.groupId)) {
    query.groupId = value.groupId as unknown as string;
  } else if (isNumber(value.groupId)) {
    query.groupId = +decodeURI(value.groupId);
  }

  if (value.priceRange) {
    query.priceRange = value.priceRange.split('-').map((i) => +decodeURI(i));
    if (!isNumber(query.priceRange[0])) {
      throw new HttpException(
        'Price range values should be a numbers',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  if (value.characteristics) {
    query.characteristics = value.characteristics.split(',');
  }

  if (!isNaN(+value.discount)) {
    query.discount = +value.discount;
  }

  return query;
};
