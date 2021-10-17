import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';

export class CookieSetBearerResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        try {
          const res: Response = context.switchToHttp().getResponse();
          const send = res.send;
          res.send = (body) => {
            const token = JSON.parse(Object.values(body).join(''));
            if (!token.token) {
              throw new BadGatewayException(
                token,
                'Cookie bearer could not be set due to wrong api usage of interceptor',
              );
            }
            res.cookie('bearer', token.token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 24 * 5,
            });
            res.send = send;
            return res.send(body);
          };
        } catch (e) {
          throw new BadGatewayException(
            e,
            'Cookie bearer could not be set due to wrong api usage of interceptor',
          );
        }
      }),
    );
  }
}
