import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { MoyskladApi } from './moysklad.api';
import {
  MoyskladCountry,
  MoyskladCurrency,
  MoyskladHookResponse,
  MoyskladImageResponse,
  MoyskladProduct,
  MoyskladResponse,
  UomMeasure,
  WebhookAction,
} from '../interfaces/moysklad-api-types';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { InjectModel } from '@nestjs/sequelize';
import { MoyskladWebhook } from '../model/moysklad-webhook.model';
import { WEBHOOK_PRODUCT } from '../app/constants';
import { MakeImportDto } from '../import-export/dto/make-import.dto';
import throwExceptionIfNull from '../utils/throw-exception-if-null';
import fetchTimeout from '../utils/fetchTimeout';
import strLast from '../utils/last';
import nullIfException from '../utils/null-if-exception';
import { ProductTypes } from '../interfaces/product-type.enum';
import {
  ProductMeasure,
  ProductMeasureEnum,
} from '../interfaces/product-measure.enum';

type MakeImportDtoUngrouped = Omit<MakeImportDto, 'group'> & { group?: string };

@Injectable()
export class MoyskladService {
  private api: MoyskladApi;
  private connected = false;
  private static uoms: UomMeasure[] = [];
  private static currencies: MoyskladCurrency[] = [];
  private static countries: MoyskladCountry[] = [];
  private readonly logger = new Logger(MoyskladService.name, {
    timestamp: true,
  });
  private static readonly TIMEOUT = 1000;
  private currentHookData: [WebhookAction, string] = [WebhookAction.CREATE, ''];
  // private employee: MoyskladEmployee;
  constructor(
    @InjectModel(MoyskladWebhook)
    private readonly moyskladWebhookRepository: typeof MoyskladWebhook,
    @Inject(forwardRef(() => AppSettingsService))
    private readonly appSettingsService: AppSettingsService,
  ) {
    this.api = new MoyskladApi();
  }

  private async authorize() {
    if (this.api.unauthorized) {
      const settings = await this.appSettingsService.getSettings();
      if (!settings.moyskladToken) {
        return false;
      }
      this.api.authorization = await settings.moyskladToken;

      return true;
    }
  }

  async generateBearer(): Promise<string | undefined> {
    if (this.api.unauthorized) {
      const auth = await this.authorize();
      if (!auth) {
        throw new HttpException(
          'Moysklad authentication has been failed',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const data = await fetch(this.api.authUrl, {
        method: 'POST',
        headers: {
          Authorization: this.api.auth,
        },
      });

      const accessToken: { access_token?: string; errors?: any } =
        await data.json();
      if (!accessToken.access_token) {
        throw new HttpException(accessToken.errors, HttpStatus.UNAUTHORIZED);
      }

      this.api.bearer = accessToken.access_token;
      this.connected = true;
      return accessToken.access_token;
    }
  }

  private async checkOnAuth() {
    const settings = await this.appSettingsService.getSettings();
    this.api.authorization = settings.moyskladToken;
    this.api.bearer = settings.moyskladAccessToken ?? '';
    if (this.api.unauthorized) {
      throw new HttpException(
        'Application does not have access rights for the moysklad api',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async makeRequest<T>(props: {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: Record<string, any>;
    timeout?: number;
  }) {
    props.timeout = props.timeout ?? MoyskladService.TIMEOUT;
    const initOptions: RequestInit = {
      method: props.method,
      headers: {
        Authorization: this.api.auth,
        ...props.headers,
      },
    };
    if (props.body) {
      initOptions.body = JSON.stringify(props.body);
    }
    // this.logger.log(
    //   `Sending request to ${props.url} with method ${props.method}`,
    // );
    let data!: Response;
    try {
      data = await fetchTimeout(props.url, props.timeout, initOptions);
    } catch (e) {
      if ((e as { name: string }).name === 'AbortError') {
        this.logger.error(
          `Fetch aborted with timeout ${props.timeout} and ${e}`,
        );
      }
      throw new HttpException(
        `Unknown error occurred ${e}`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    if (data.status === HttpStatus.NOT_FOUND) {
      throw new HttpException(JSON.stringify(data), data.status);
    }

    const jsonData: T & { errors?: any } = await data.json();

    if (jsonData.errors) {
      throw new HttpException(jsonData.errors, HttpStatus.BAD_REQUEST);
    }
    return jsonData as T;
  }

  private static get rootUrl(): string {
    return process.env.HTTPS
      ? process.env.HTTPS
      : process.env.NEXT_PUBLIC_ROOT_URL ?? '';
  }

  private static get productHookUrl(): string {
    return MoyskladService.rootUrl + '/v1/moysklad' + WEBHOOK_PRODUCT;
  }

  private async makeHookRequest(entity: string, action: string) {
    return this.makeRequest<MoyskladHookResponse>({
      url: this.api.webhookUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        url: MoyskladService.productHookUrl,
        action,
        entityType: entity,
      },
      timeout: 2000,
    });
  }

  private async createProductCreatedHook(): Promise<MoyskladHookResponse> {
    this.currentHookData[0] = WebhookAction.CREATE;
    this.currentHookData[1] = MoyskladService.productHookUrl;
    return await this.makeHookRequest('product', this.currentHookData[0]);
  }

  private async createProductUpdatedHook(): Promise<MoyskladHookResponse> {
    this.currentHookData[0] = WebhookAction.UPDATE;
    this.currentHookData[1] = MoyskladService.productHookUrl;
    return await this.makeHookRequest('product', this.currentHookData[0]);
  }

  private async createProductRemovedHook(): Promise<MoyskladHookResponse> {
    this.currentHookData[0] = WebhookAction.DELETE;
    this.currentHookData[1] = MoyskladService.productHookUrl;
    return await this.makeHookRequest('product', this.currentHookData[0]);
  }
  private async deleteProductCreatedHook(id: string) {
    return await this.makeRequest({
      url: this.api.webhookUrl + '/' + id,
      method: 'DELETE',
      headers: {},
    });
  }

  private async getChunkOfProducts(
    offset = 0,
    limit = 1000,
  ): Promise<MoyskladResponse> {
    await this.checkOnAuth();
    const data = await fetch(
      `${this.api.productUrl}?offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
        redirect: 'follow',
        headers: {
          Authorization: this.api.auth,
        },
      },
    );

    return await data.json();
  }

  async getProducts(): Promise<MoyskladProduct[]> {
    await this.checkOnAuth();
    this.logger.log('Getting products from moysklad');
    const products: MoyskladProduct[] = [];
    let allFetched = false;
    while (!allFetched) {
      const json = await this.getChunkOfProducts(products.length);
      products.push(...json.rows);
      allFetched = products.length >= json.meta.size;
    }

    this.logger.log(`Got ${products.length} products`);
    return products;
  }

  async getWebhooks(): Promise<MoyskladHookResponse[]> {
    await this.checkOnAuth();
    const data = await this.makeRequest<MoyskladResponse<MoyskladHookResponse>>(
      {
        url: this.api.webhookUrl,
        method: 'GET',
        headers: {},
      },
    );

    return data.rows;
  }

  async removeCurrentUrlWebhooks(url: string, action: WebhookAction) {
    await this.checkOnAuth();
    const hooks = await this.getWebhooks();
    hooks
      .filter((hook) => hook.action === action && hook.url === url)
      .map((hook) => this.deleteProductCreatedHook(hook.id));
  }

  private async getItem<T>(
    url: string,
    id: string,
    subGroup?: string,
  ): Promise<T> {
    await this.checkOnAuth();
    return await this.makeRequest<T>({
      url: subGroup ? `${url}/${id}/${subGroup}` : `${url}/${id}`,
      method: 'GET',
      headers: {},
    });
  }

  async getProduct(id: string): Promise<MoyskladProduct> {
    return this.getItem(this.api.productUrl, id);
  }

  async getUom(id: string): Promise<UomMeasure> {
    const uoms = await this.getUoms();
    const idUom = uoms.find((i) => i.id === id);
    return throwExceptionIfNull<UomMeasure>(idUom, 'idUom');
  }

  async getUoms() {
    if (MoyskladService.uoms.length === 0) {
      MoyskladService.uoms = (
        await this.makeRequest<MoyskladResponse<UomMeasure>>({
          url: this.api.uomUrl,
          method: 'GET',
          headers: {},
        })
      ).rows;
    }
    return MoyskladService.uoms;
  }

  async getCurrencies() {
    if (MoyskladService.currencies.length === 0) {
      MoyskladService.currencies = (
        await this.makeRequest<MoyskladResponse<MoyskladCurrency>>({
          url: this.api.currencyUrl,
          method: 'GET',
          headers: {},
        })
      ).rows;
    }
    return MoyskladService.currencies;
  }

  async getCountries() {
    if (MoyskladService.countries.length === 0) {
      MoyskladService.countries = (
        await this.makeRequest<MoyskladResponse<MoyskladCountry>>({
          url: this.api.countryUrl,
          method: 'GET',
          headers: {},
        })
      ).rows;
    }
    return MoyskladService.countries;
  }

  async getCountry(id: string) {
    const countries = await this.getCountries();
    return countries.find((i) => i.id === id);
  }

  async getCurrency(id: string): Promise<MoyskladCurrency> {
    const currencies = await this.getCurrencies();
    return throwExceptionIfNull(currencies.find((i) => i.id === id));
  }

  async getImages(id: string): Promise<MoyskladImageResponse> {
    return this.getItem(this.api.productUrl, id, 'images');
  }

  private async createWebhook(
    hookCreator: () => Promise<MoyskladHookResponse>,
    attemptsLimit = 10,
    attempts = 0,
  ) {
    if (attempts === attemptsLimit) {
      return;
    }
    try {
      const hook = await hookCreator();
      await this.moyskladWebhookRepository.create({
        url: hook.url,
        action: hook.action,
        uuid: hook.id,
      });
    } catch (e) {
      if (e instanceof HttpException && e.getResponse()[0].code === 30003) {
        this.logger.warn(
          `Such webhook already exists. Error message: ${
            e.getResponse()[0].error
          }. More info: ${e.getResponse()[0].moreInfo}`,
        );
        this.logger.log('Trying to delete unrecognized hook. Please wait...');
        await this.removeCurrentUrlWebhooks(
          this.currentHookData[1],
          this.currentHookData[0],
        );
        attempts += 1;
        await this.createWebhook(hookCreator, attemptsLimit, attempts);
      } else {
        throw e;
      }
    }
  }

  async createWebhooks() {
    await this.checkOnAuth();
    await this.createWebhook(this.createProductCreatedHook.bind(this));
    await this.createWebhook(this.createProductUpdatedHook.bind(this));
    await this.createWebhook(this.createProductRemovedHook.bind(this));
  }

  async deleteWebhooks() {
    await this.checkOnAuth();
    const hooks = await this.moyskladWebhookRepository.findAll();
    for (const hook of hooks) {
      try {
        await this.deleteProductCreatedHook(hook.uuid);
      } catch (e) {
        if (e instanceof HttpException) {
          throw e;
        }
      }
      await this.moyskladWebhookRepository.destroy({
        where: { uuid: hook.uuid },
      });
    }
  }

  async hasWebhooks() {
    const size = await this.moyskladWebhookRepository.count();
    return size > 0;
  }

  async getBearer() {
    const settings = await this.appSettingsService.getSettings();
    return settings.moyskladAccessToken;
  }

  async toImportDto(product: MoyskladProduct): Promise<MakeImportDtoUngrouped> {
    const groupName = strLast(product.pathName);

    const uomId = strLast(product.uom?.meta?.href ?? '');
    const uomMeasure = uomId
      ? await nullIfException(this.getUom(uomId), this.logger)
      : null;

    const currencyId = strLast(product.salePrices[0].currency.meta?.href ?? '');
    const currency = currencyId
      ? await nullIfException(this.getCurrency(currencyId), this.logger)
      : null;

    let country: MoyskladCountry | null | undefined = null;
    if (product.country && product.country.href) {
      const countryId = strLast(product.country.href);
      country = countryId
        ? await nullIfException(this.getCountry(countryId), this.logger)
        : null;
    }

    const imageId = product.images.meta?.href.split('/').at(-2);
    const imageResponse = imageId
      ? await nullIfException(this.getImages(imageId), this.logger)
      : null;
    const bearer = await this.getBearer();

    return {
      uuid: product.id,
      name: product.name,
      group: groupName,
      price:
        product.salePrices.length > 0 ? product.salePrices[0].value / 100 : 0,
      costPrice: product.buyPrice.value / 100,
      description: product.description,
      code: !isNaN(+product.code) ? +product.code : 0,
      productType: ProductTypes[product.trackingType],
      tax: product?.taxSystem,
      allowToSell: !product.archived,
      quantity: product.volume,
      barCodes: product.barcodes ? product.barcodes.map((b) => b.ean13) : [],
      measureName: uomMeasure?.name
        ? (Object.entries(ProductMeasure).find(
            ([_, value]) => uomMeasure.name === value,
          ) as unknown as ProductMeasureEnum)
        : undefined,
      articleNumber: !isNaN(+product.article) ? +product.article : 0,
      attributes: product.attributes
        ? product.attributes.map((a) => ({ name: a.type, value: a.name }))
        : [],
      country: country?.name,
      currency: currency?.name,
      discountProhibited: product.discountProhibited,
      useParentVat: product.useParentVat,
      variantsCount: product.variantsCount,
      // images: undefined,
      images:
        imageResponse && bearer
          ? imageResponse.rows.map((r) => ({
              url: r.miniature.href,
              name: r.filename,
              type: r.miniature.mediaType,
              bearer,
            }))
          : [],
    };
  }
}
