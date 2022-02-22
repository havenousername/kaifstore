import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';
import { Response } from 'express';
import { BadGatewayException } from '@nestjs/common/exceptions/bad-gateway.exception';

export class CheckNilDataInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => {
        try {
          const res: Response = context.switchToHttp().getResponse();
          const send = res.send;
          res.send = (body) => {
            if (!body) {
              res.statusCode = HttpStatus.NO_CONTENT;
            }
            res.send = send;
            return res.send(body);
          };
        } catch (e) {
          throw new BadGatewayException(
            'Could not send data in check-nil interceptor',
          );
        }
      }),
    );
  }
}
