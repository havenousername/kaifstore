import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RemoveCookieBearerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      res.removeHeader('authorization');
    }

    if (req.cookies.bearer) {
      res.clearCookie('bearer');
      res.end();
      req.cookies.bearer = undefined;
    }

    next();
  }
}
