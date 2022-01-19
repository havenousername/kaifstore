import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieToBearerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    const bearerToken: string | undefined = req.cookies.bearer;
    if (!!bearerToken) {
      req.headers['authorization'] = `Bearer ${bearerToken}`;
    }
    next();
  }
}
