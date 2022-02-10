import { PaginateOptions } from 'nestjs-sequelize-paginate';

const generatePaginationOptions = ({
  page,
  url,
  path,
  limit,
}: {
  page: number;
  limit: number;
  url?: string;
  path?: string;
}): PaginateOptions => ({
  page,
  offset: limit,
  structure: 'segmented',
  url: url,
  path: path,
  details: 'complete',
});

export { generatePaginationOptions };
