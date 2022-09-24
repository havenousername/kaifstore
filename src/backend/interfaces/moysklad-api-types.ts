import { ProductMeasure } from './product-measure.enum';

export type MoyskladResponse<T = MoyskladProduct> = {
  context: {
    employee: MoyskladMeta;
  };
  meta: MoyskladMeta;
  rows: T[];
};

type MoyskladMeta = {
  href: string;
  metadataHref: string;
  type: string;
  mediaType: string;
  size: number;
  limit: number;
  offset: number;
};

type MoyskladAttributes = {
  meta: MoyskladMeta;
  id: string;
  name: string;
  type: string;
  value: boolean;
};

enum TaxSystem {
  GENERAL_TAX_SYSTEM = 'GENERAL_TAX_SYSTEM',
  PATENT_BASED = 'PATENT_BASED',
  PRESUMPTIVE_TAX_SYSTEM = 'PRESUMPTIVE_TAX_SYSTEM',
  SIMPLIFIED_TAX_SYSTEM_INCOME = 'SIMPLIFIED_TAX_SYSTEM_INCOME',
  SIMPLIFIED_TAX_SYSTEM_INCOME_OUTCOME = 'SIMPLIFIED_TAX_SYSTEM_INCOME_OUTCOME',
  TAX_SYSTEM_SAME_AS_GROUP = 'TAX_SYSTEM_SAME_AS_GROUP',
  UNIFIED_AGRICULTURAL_TAX = 'UNIFIED_AGRICULTURAL_TAX',
}

enum MoyskladBarcode {
  EAN13 = 'ean13',
  EAN8 = 'ean8',
  CODE128 = 'code128',
  GTIN = 'GTIN',
}

enum MoyskladPaymentItemType {
  GOOD = 'GOOD',
  EXCISABLE_GOOD = 'EXCISABLE_GOOD',
  COMPOUND_PAYMENT_ITEM = 'COMPOUND_PAYMENT_ITEM',
  ANOTHER_PAYMENT_ITEM = 'ANOTHER_PAYMENT_ITEM',
}

type MoyskladBarcodeObject = Record<MoyskladBarcode, string>;

type MoyskladAlcoholic = {
  excise: boolean;
  type: number;
  strength: number;
  volume: number;
};

type MoyskladBuyPrice = {
  value: number;
  currency: MoyskladMeta;
};

type MoyskladObject = {
  meta: MoyskladMeta;
};

type MoyskladFile = {
  created: string;
  createdBy: MoyskladObject;
  filename: string;
  meta: MoyskladMeta;
  miniature: MoyskladObject;
  size: number;
  tiny: MoyskladMeta;
  title: string;
};

type MoyskladSalePrice = {
  value: number;
  currency: MoyskladObject;
  priceType: {
    meta: MoyskladMeta;
    id: string;
    name: string;
    externalCode: string;
  };
};

export type MoyskladProduct = {
  meta: MoyskladMeta;
  id: string;
  accountId: string;
  alcoholic: MoyskladAlcoholic;
  article: string;
  attributes: Array<MoyskladAttributes>;
  barcodes: Array<MoyskladBarcodeObject>;
  buyPrice: MoyskladBuyPrice;
  code: string;
  country: MoyskladMeta & { uuidHref: string };
  owner: MoyskladObject;
  shared: boolean;
  group: MoyskladObject;
  files: MoyskladFile[];
  updated: string;
  name: string;
  description: string;
  externalCode: string;
  archived: boolean;
  pathName: string;
  vat: number;
  vatEnabled: boolean;
  useParentVat: boolean;
  effectiveVat: number;
  effectiveVatEnabled: boolean;
  discountProhibited: boolean;
  isSerialTrackable: boolean;
  uom: MoyskladObject;
  images: MoyskladObject;
  minPrice: MoyskladBuyPrice;
  minimumBalance: number;
  packs: Record<string, unknown>;
  partialDisposal: boolean;
  paymentItemType: MoyskladPaymentItemType;
  ppeType: number;
  productFolder: MoyskladObject;
  salePrices: MoyskladSalePrice[];
  supplier: MoyskladObject;
  syncId: string;
  taxSystem: TaxSystem;
  things: string[];
  tnved: string;
  trackingType: string;
  variantsCount: number;
  volume: number;
  weight: number;
};

export type MoyskladEmployees = {
  context: {
    employee: MoyskladMeta;
  };
  meta: MoyskladMeta;
  rows: MoyskladEmployee[];
};

export type MoyskladEmployee = {
  meta: MoyskladMeta;
  id: string;
  accountId: string;
  updated: string;
  name: string;
  externalCode: string;
  archived: boolean;
  uid: string;
  email: string;
  lastName: string;
  fullName: string;
  shortFio: string;
  cashiers: { meta: MoyskladMeta }[];
  retailStore: { meta: MoyskladMeta };
  inn: string;
  position: string;
};

export type MoyskladHookResponse = {
  meta: MoyskladMeta;
  id: string;
  accountId: string;
  entityType: string;
  url: string;
  method: string;
  enabled: boolean;
  action: string;
};

export type MoyskladWebhook = {
  auditContext: MoyskladAuditContext;
  events: MoyskladEvent[];
};

type MoyskladWebhookMeta = {
  type: string;
  href: string;
};

type MoyskladAuditContext = {
  meta: MoyskladWebhookMeta;
  uid: string;
  moment: string;
};

export type MoyskladEvent = {
  meta: MoyskladWebhookMeta;
  action: string;
  accountId: string;
};

export enum WebhookAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  PROCESSED = 'PROCESSED',
}

export type UomMeasure = {
  meta: MoyskladMeta;
  id: string;
  updated: string;
  name: ProductMeasure;
  description: string;
  code: string;
  externalCode: string;
};

export type MoyskladCurrency = {
  meta: MoyskladMeta;
  id: string;
  system: false;
  name: string;
  fullName: string;
  rate: number;
  multiplicity: number;
  indirect: boolean;
  rateUpdateType: string;
  code: string;
  isoCode: string;
  majorUnit: Record<string, string>;
  minorUnit: Record<string, string>;
  archived: boolean;
  default: boolean;
};

export type MoyskladCountry = {
  accountId: string;
  code: string;
  description: string;
  externalCode: string;
  group: MoyskladMeta;
  id: string;
  meta: MoyskladMeta;
  name: string;
  owner: MoyskladMeta;
  shared: boolean;
  updated: string;
};

export type MoyskladImageRow = {
  meta: MoyskladMeta & { downloadHref: string };
  title: string;
  filename: string;
  updated: string;
  miniature: {
    href: string;
    type: string;
    mediaType: string;
  };
  tiny: {
    href: string;
    type: string;
    mediaType: string;
  };
};

export type MoyskladImageResponse = {
  context: {
    employee: MoyskladMeta;
  };
  meta: MoyskladMeta;
  rows: MoyskladImageRow[];
};
