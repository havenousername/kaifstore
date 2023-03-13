import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';

export enum JsonEntityField {
  UUID = 'uuid',
  NAME = 'name',
  GROUP = 'group',
  PRICE = 'price',
  COST_PRICE = 'costPrice',
  QUANTITY = 'quantity',
  PARENT_UUID = 'parentUuid',
  CODE = 'code',
  HAS_VARIANTS = 'hasVariants',
  ALLOW_TO_SELL = 'allowToSell',
  MEASURE_NAME = 'measureName',
  DESCRIPTION = 'description',
  ARTICLE_NUMBER = 'articleNumber',
  TAX = 'tax',
  BAR_CODES = 'barCodes',
  PRODUCT_TYPE = 'productType',
  CURRENCY = 'currency',
  COUNTRY = 'country',
  DISCOUNT_PROHIBITED = 'discountProhibited',
  USE_PARENT_VAT = 'useParentVat',
  VARIANTS_COUNT = 'variantsCount',
}

export type JsonEntity = {
  [JsonEntityField.UUID]: string;
  [JsonEntityField.NAME]: string;
  [JsonEntityField.GROUP]: string;
  [JsonEntityField.HAS_VARIANTS]?: boolean;
  [JsonEntityField.CODE]?: string;
  [JsonEntityField.PARENT_UUID]?: string;
  [JsonEntityField.MEASURE_NAME]?: string;
  [JsonEntityField.ALLOW_TO_SELL]?: boolean;
  [JsonEntityField.DESCRIPTION]?: string;
  [JsonEntityField.ARTICLE_NUMBER]?: string;
  [JsonEntityField.TAX]?: string;
  [JsonEntityField.PRICE]?: number;
  [JsonEntityField.COST_PRICE]?: number;
  [JsonEntityField.QUANTITY]?: number;
  [JsonEntityField.BAR_CODES]?: string[];
  [JsonEntityField.CURRENCY]?: string;
  [JsonEntityField.COUNTRY]?: string;
  [JsonEntityField.DISCOUNT_PROHIBITED]?: boolean;
  [JsonEntityField.PRODUCT_TYPE]?: number;
  [JsonEntityField.USE_PARENT_VAT]?: string;
  [JsonEntityField.VARIANTS_COUNT]?: number;
};

export type ImportFields = {
  name: JsonEntityField;
  rule: string;
} & GridColDef;
