import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PipeTransform } from '@nestjs/common/interfaces/features/pipe-transform.interface';

export const CustomQuery = (
  filterQuery: (query: Record<any, any>) => any,
  ...pipes: PipeTransform[]
) => {
  return createParamDecorator((data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return {
      desc: request.query['desc'],
      asc: request.query['asc'],
      ...filterQuery(request.query),
    };
  })(...pipes);
};
