import { Headers } from 'node-fetch';

export class MoyskladApi {
  private authorization = process.env.MOISKLAD_API;
  constructor(protected rootUrl = 'https://online.moysklad.ru/api/remap') {}

  get productUrl() {
    return this.rootUrl + '/1.2/entity/product';
  }

  get headers(): Headers {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.authorization);
    return headers;
  }
}
