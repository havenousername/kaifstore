import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { MoyskladApi } from './moysklad.api';
import {
  MoyskladHookResponse,
  MoyskladProduct,
  MoyskladResponse,
} from '../interfaces/moysklad-api-types';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { InjectModel } from '@nestjs/sequelize';
import { MoyskladWebhook } from '../model/moysklad-webhook.model';
import { WEBHOOK_PRODUCT } from '../app/constants';

@Injectable()
export class MoyskladService {
  private api: MoyskladApi;
  private connected = false;
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

  async generateBearer(): Promise<string> {
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
    this.api.bearer = settings.moyskladAccessToken;
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
  }) {
    const data = await fetch(props.url, {
      method: props.method,
      headers: {
        Authorization: this.api.auth,
        ...props.headers,
      },
      body: props.body ? JSON.stringify(props.body) : undefined,
    });
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
    return process.env.NGROK_URL ?? process.env.NEXT_PUBLIC_ROOT_URL;
  }

  private async makeHookRequest(entity: string, action: string) {
    return this.makeRequest<MoyskladHookResponse>({
      url: this.api.webhookUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        url: MoyskladService.rootUrl + '/v1/moysklad' + WEBHOOK_PRODUCT,
        action,
        entityType: entity,
      },
    });
  }

  private async createProductCreatedHook(): Promise<MoyskladHookResponse> {
    return await this.makeHookRequest('product', 'CREATE');
  }

  private async createProductUpdatedHook(): Promise<MoyskladHookResponse> {
    return await this.makeHookRequest('product', 'UPDATE');
  }

  private async createProductRemovedHook(): Promise<MoyskladHookResponse> {
    return await this.makeHookRequest('product', 'DELETE');
  }

  private async deleteProductCreatedHook(id: string) {
    return await this.makeRequest({
      url: this.api.webhookUrl + '/' + id,
      method: 'DELETE',
      headers: {},
    });
  }

  async getProducts(): Promise<MoyskladProduct[]> {
    if (!this.connected) {
      return [];
    }
    const data = await fetch(this.api.productUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: this.api.auth,
      },
    });

    const jsonData: MoyskladResponse = await data.json();
    return jsonData.rows;
  }

  async createWebhooks() {
    await this.checkOnAuth();
    const onCreateHook = await this.createProductCreatedHook();
    await this.moyskladWebhookRepository.create({
      url: onCreateHook.url,
      action: onCreateHook.action,
      uuid: onCreateHook.id,
    });

    const onUpdateHook = await this.createProductUpdatedHook();
    await this.moyskladWebhookRepository.create({
      url: onUpdateHook.url,
      action: onUpdateHook.action,
      uuid: onUpdateHook.id,
    });

    const onDeleteHook = await this.createProductRemovedHook();
    await this.moyskladWebhookRepository.create({
      url: onDeleteHook.url,
      action: onDeleteHook.action,
      uuid: onDeleteHook.id,
    });
  }

  async deleteWebhooks() {
    await this.checkOnAuth();
    const hooks = await this.moyskladWebhookRepository.findAll();
    for (const hook of hooks) {
      await this.deleteProductCreatedHook(hook.uuid);
    }
  }
}
