type Order = 'desc' | 'asc';
export enum OrderBy {
  DESC = 'DESC',
  ASC = 'ASC',
}

export type CustomQueryKey<T> = Order | T;

export type CustomQueries<T extends string> = {
  [o in CustomQueryKey<T>]?: Array<string | number> | string | number;
};
