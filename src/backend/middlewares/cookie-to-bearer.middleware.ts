import { Request, Response, NextFunction } from 'express';

const cookieToBearerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const bearerToken: string | undefined = req.cookies.bearer;
  if (!!bearerToken) {
    req.headers['authorization'] = `Bearer ${bearerToken}`;
  }
  next();
};

export { cookieToBearerMiddleware };
