import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { Response } from 'express';

@Catch(ForbiddenException)
export class ViewAdminFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).redirect('/');
  }
}
