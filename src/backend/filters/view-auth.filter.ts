import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { PRIVATE_VIEW_REDIRECT_ROUTE } from '../app/constants';

@Catch(UnauthorizedException)
export class ViewAuthFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.log(exception.getResponse());

    response.status(status).redirect(PRIVATE_VIEW_REDIRECT_ROUTE);
  }
}
