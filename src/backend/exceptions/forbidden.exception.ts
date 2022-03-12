import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  messages: string[];

  constructor(response: string[]) {
    super(response, HttpStatus.FORBIDDEN);
    this.messages = response;
  }
}
