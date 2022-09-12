import { Injectable } from '@nestjs/common';

@Injectable()
export class MoyskladWebhookService {
  public productChanged(dto: any) {
    console.log('product changed', dto);
  }
}
