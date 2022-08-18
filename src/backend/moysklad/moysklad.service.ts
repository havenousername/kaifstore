import { Injectable } from '@nestjs/common';
import { MoyskladApi } from './moysklad.api';
import {
  MoyskladProduct,
  MoyskladResponse,
} from '../interfaces/moysklad-api-types';

@Injectable()
export class MoyskladService {
  private api = new MoyskladApi();

  async getProducts(): Promise<MoyskladProduct[]> {
    const headers = this.api.headers;
    const data = await fetch(this.api.productUrl, {
      method: 'GET',
      redirect: 'follow',
      headers,
    });

    const jsonData: MoyskladResponse = await data.json();
    return jsonData.rows;
  }
}
