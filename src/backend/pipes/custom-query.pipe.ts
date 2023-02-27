import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CustomQueries, CustomQueryKey } from '../interfaces/query';
import { isArray } from 'class-validator';
import { isPrimitive, isString } from '../utils/type-checkers';

@Injectable()
export class ParseCustomQuery<T extends string>
  implements PipeTransform<unknown>
{
  filterQueryHandler: (
    query: CustomQueries<T>,
    value: Record<CustomQueryKey<T>, any>,
  ) => CustomQueries<T>;
  constructor(options: {
    filterQueryHandler: (
      query: CustomQueries<T>,
      value: Record<CustomQueryKey<T>, any>,
    ) => CustomQueries<T>;
  }) {
    this.filterQueryHandler = options.filterQueryHandler;
  }

  private static toStringArray(key: unknown): string[] {
    let arr: string[] = [];
    if (isArray(key)) {
      arr = key as string[];
    } else if (isPrimitive(key)) {
      if (isString(key)) {
        arr = key.split(',');
      } else {
        arr = [String(key)];
      }
    }

    return arr;
  }
  transform(
    value: Record<CustomQueryKey<T>, any>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ): any {
    const result: CustomQueries<T> = { asc: [], desc: [] };
    if (value.asc) {
      result.asc = ParseCustomQuery.toStringArray(value.asc);
    }

    if (value.desc) {
      result.desc = ParseCustomQuery.toStringArray(value.desc);
    }

    return this.filterQueryHandler(result, value);
  }
}
