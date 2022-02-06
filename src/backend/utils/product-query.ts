import { isNumber, isUUID } from 'class-validator';
import { CustomQueries, CustomQueryKey } from '../interfaces/query';
import { HttpException, HttpStatus } from '@nestjs/common';

export type ProductQuery = 'priceRange' | 'q' | 'groupId' | 'characteristics';

export const productQuerySelect = (
  query: unknown,
): Record<ProductQuery, any> => {
  return {
    priceRange: query['priceRange'],
    q: query['q'],
    groupId: query['groupId'],
    characteristics: query['characteristics'],
  };
};

export const productQueryToArray = (
  query: CustomQueries<ProductQuery>,
  value: Record<CustomQueryKey<ProductQuery>, any>,
): CustomQueries<ProductQuery> => {
  if (value.q) {
    query.q = String(value.q);
  }
  if (isUUID(value.groupId)) {
    query.groupId = String(value);
  } else if (isNumber(value.groupId)) {
    query.groupId = +value;
  }

  if (value.priceRange) {
    query.priceRange = value.priceRange.split('-').map((i) => +i);
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

  return query;
};
