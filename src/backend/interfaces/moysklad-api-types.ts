import { ProductType } from './product-type.enum';

export type MoyskladResponse = {
  context: {
    employee: MoyskladMeta;
  };
  meta: MoyskladMeta;
  rows: MoyskladProduct[];
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
  country: string;
  owner: MoyskladObject;
  shared: boolean;
  group: MoyskladObject;
  files: MoyskladFile[];
  updated: string;
  name: string;
  description: string;
  externalCode: string;
  archived: string;
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
  trackingType: ProductType;
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
