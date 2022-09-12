export class MoyskladApi {
  constructor(
    protected rootUrl = 'https://online.moysklad.ru/api/remap',
    protected _authorization?: string,
    protected _bearer?: string,
  ) {}

  set authorization(auth: string) {
    this._authorization = auth;
  }

  get auth() {
    return this._bearer
      ? 'Bearer ' + this._bearer
      : 'Basic ' + this._authorization;
  }

  set bearer(bearer: string) {
    this._bearer = bearer;
  }

  get unauthorized(): boolean {
    return !this._authorization;
  }

  get productUrl() {
    return this.rootUrl + '/1.2/entity/product';
  }

  get authUrl() {
    return this.rootUrl + '/1.2/security/token';
  }

  get employeeUrl() {
    return this.rootUrl + '/1.2/entity/employee"';
  }

  get webhookUrl() {
    return this.rootUrl + '/1.2/entity/webhook';
  }
}
